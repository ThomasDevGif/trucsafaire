import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ListService } from '../../services/list/list.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { List } from '../../models/list';

@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.scss']
})
export class DialogShareComponent implements OnInit {

  // Autcomplete form
  mySelectUserControl: FormControl = new FormControl();
  filteredUsers: Observable<any[]>;

  loading:boolean = false;
  list:List;

  users:User[];
  sharedUsers: User[];

  constructor(
    private listService: ListService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogShareComponent>
  ) {
    // Get dialog param
    this.list = data.list as List;

    // Init autocomplete filter
    this.filteredUsers = this.mySelectUserControl.valueChanges
    .pipe(
      startWith(''),
      map(user => user ? this.filterUsers(user) : this.users.slice())
    );
  }

  ngOnInit() {
    this.refreshUsers();
  }

  /**
  * Close shared modal
  */
  close() {
    this.dialogRef.close();
  }

  /**
   * Get users and shared users from server
   */
  refreshUsers() {
    let self = this;
    self.loading = true;
    self.userService.getUsers()
    .then(function(resUsers) {
      self.users = resUsers;
      return self.listService.getSharedUsersByList(self.list)
    })
    .then(function(resSharedUsers) {
      self.sharedUsers = resSharedUsers;
      self.loading = false;
    });
  }

  /**
   * Share list with selected user
   */
  shareList() {
    let self = this;
    self.loading = true;
    let users = self.getUsersByName(self.mySelectUserControl.value);
    if (!users) {
      return;
    }
    let sharedList = {
      listId: self.list.id,
      userId: users[0].id
    }
    self.listService.createSharedList(sharedList)
    .then(function(res) {
      return self.refreshUsers();
    })
  }

  /**
   * Get users by username
   * @param {string} Username
   */
  getUsersByName(username:string):User[] {
    return this.users.filter(user => user.name == username);
  }

  /**
   * Stop sharing list with a user
   * @param {User} sharedUser
   */
  deleteSharedUserByList(sharedUser: User) {
    let self = this;
    self.loading = true;
    self.listService.deleteSharedUserByList(sharedUser, self.list)
    .then(function() {
      return self.refreshUsers();
    })
  }

  /**
  * Automplete filter
  * @param {string} name User name
  */
  filterUsers(name: string) {
    return this.users.filter(user =>
      user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
