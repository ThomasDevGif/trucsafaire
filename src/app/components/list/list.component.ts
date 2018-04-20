import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { ConverterService } from '../../utils/converter.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { List } from '../../models/list';
import { Item } from '../../models/item';
import { User } from '../../models/user';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  loading: boolean;
  lists: List[] = [
    {
      id: 1,
      name: 'Une super liste avec un nom tellement long',
      userId: null
    }, {
      id: 2,
      name: 'a',
      userId: null
    }
  ];
  sharedLists: List[];

  items: Item[] = [
    {
      id: null,
      name: 'Item',
      done: false,
      date: '20/04/2018',
      listId: 1
    }, {
      id: null,
      name: 'Item 1',
      done: false,
      date: '20/04/2018',
      listId: 1
    }, {
      id: null,
      name: 'Item 3',
      done: true,
      date: '20/04/2018',
      listId: 1
    }
  ];

  selectedList: List;

  // Logged user
  loggedUser: User;

  // New item
  showNewItemInput: boolean = false;
  newItemForm: FormGroup;
  newItemCtrl: FormControl;

  // Dialogs confirm
  deleteListMessage:string = 'Cliquer sur SUPPRIMER effacera la liste et tous les items associés.';
  deleteItemMessage:string = 'Supprimer cet élément ?';

  constructor(
    private authentificationService: AuthentificationService,
    private converterService: ConverterService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.newItemCtrl = fb.control('', [ Validators.required ]);
    this.newItemForm = fb.group({
      newItem: this.newItemCtrl
    });
  }

  ngOnInit() {
    this.loggedUser = this.authentificationService.getUser();

    // If no logged user in local storage, redirect to login page
    if (undefined == this.loggedUser) { this.router.navigate(['/login']) }
    else {
      this.intializeList();
    }
  }

  intializeList() {
    this.selectedList = this.lists[0];
  }

  filterItems(done:boolean): Item[] {
    return this.items.filter(item => item.done == done);
  }

  addItem() {
    if ('' == this.newItemCtrl.value) {
      return;
    }

    // Create item object
    let item: Item = {
      id: null,
      name: this.newItemCtrl.value,
      done: false,
      date: '20/04//2018',
      listId: 1
    }
    // Add item to list
    this.items.push(item);
    // Refresh input
    this.newItemCtrl.setValue('');
  }

  checkItem(item:Item) {
    item.done = true;
  }

  uncheckItem(item:Item) {
    item.done = false;
  }

  toggleNewItemInput(show:boolean) {
    this.showNewItemInput = show;
  }

  openConfirmDialog(message:string) {
    this.dialog.open(DialogConfirmComponent, {
      data: {
        message: message,
        cancel: 'Annuler',
        validate: 'Supprimer'
      }
    });
  }
}
