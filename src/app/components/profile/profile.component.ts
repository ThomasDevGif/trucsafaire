import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { UserService } from '../../services/user/user.service';
import { DialogLoaderComponent } from '../dialog-loader/dialog-loader.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public dialogRef: any = null;
  public loggedUser: User;

  public userForm: FormGroup;
  public userPasswordCtrl: FormControl;

  public showPassword: boolean = false;

  constructor(
    private authentificationService: AuthentificationService,
    private toolbarService: ToolbarService,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.toolbarService.setTitle('Profil');
    this.toolbarService.setHasReturn(false);

    this.userPasswordCtrl = fb.control('', [ Validators.required ]);

    this.userForm = fb.group({
      userPassword: this.userPasswordCtrl,
    });
  }

  ngOnInit() {
    this.loggedUser = this.authentificationService.getUser();
    this.userPasswordCtrl.setValue(this.loggedUser.password);
  }

  /** Update user password in database */
  public updateUser() {
    this.dialogRef = this.dialog.open(DialogLoaderComponent);

    this.loggedUser.password = this.userPasswordCtrl.value;
    this.userService.updateUserPassword(this.loggedUser)
    .then(() => {
      this.dialogRef.close();
      this.dialogRef = null;
      this.snackbarService.openSnackBar('\u2714 Votre mot de passe a été changé');
    });
  }

  public logout() {
    this.authentificationService.logout();
  }

}
