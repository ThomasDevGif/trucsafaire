import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { ListService } from '../../services/list/list.service';
import { ItemService } from '../../services/item/item.service';
import { ConverterService } from '../../utils/converter.service';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { DialogShareComponent } from '../../components/dialog-share/dialog-share.component';
import { DialogLoaderComponent } from '../dialog-loader/dialog-loader.component';
import { List } from '../../models/list';
import { Item } from '../../models/item';
import { User } from '../../models/user';

import * as moment from 'moment';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dialogRef: any = null;
  inputSelectedList = new FormControl();
  lists: List[];
  sharedLists: List[];
  selectedList: List;
  items: Item[];

  // Logged user
  loggedUser: User;

  // New list
  showNewListInput: boolean = false;
  newListForm: FormGroup;
  newListCtrl: FormControl;

  // New item
  showNewItemInput: boolean = false;
  newItemForm: FormGroup;
  newItemCtrl: FormControl;

  // Dialogs confirm
  deleteListMessage:string = 'Cliquer sur SUPPRIMER effacera la liste et tous les items associés.';
  deleteItemMessage:string = 'Supprimer ';

  constructor(
    private toolbarService: ToolbarService,
    private authentificationService: AuthentificationService,
    private listService: ListService,
    private itemService: ItemService,
    private converterService: ConverterService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.toolbarService.setTitle('Listes');
    this.toolbarService.setHasReturn(false);

    this.newItemCtrl = fb.control('', [ Validators.required ]);
    this.newItemForm = fb.group({
      newItem: this.newItemCtrl
    });

    this.newListCtrl = fb.control('', [ Validators.required ]);
    this.newListForm = fb.group({
      newList: this.newListCtrl
    });
  }

  ngOnInit() {
    this.loggedUser = this.authentificationService.getUser();
    this.refreshList();
  }

  /** Refresh user lists from server */
  refreshList() {
    let self = this;

    if (null == self.dialogRef) {
      self.dialogRef = self.dialog.open(DialogLoaderComponent);
    }

    self.listService.getListsByUser(self.loggedUser)
    .then(function(resLists) {
      self.lists = resLists;
      return self.listService.getSharedListsByUser(self.loggedUser);
    })
    .then(function(resSharedLists) {
      self.sharedLists = resSharedLists;
      self.selectedList = self.lists[0];
      return self.refreshItems();
    });
  }

  onSelectedListChange(list: List) {
    let self = this;
    self.selectedList = list;
    return self.refreshItems();
  }

  /** Create list on db */
  createList() {
    let self = this;
    if ('' == self.newListCtrl.value) {
      return;
    }

    let list : List = {
      id: null,
      name: self.newListCtrl.value,
      userId: self.authentificationService.getUser().id
    }

    if (null == self.dialogRef) {
      self.dialogRef = self.dialog.open(DialogLoaderComponent);
    }

    self.listService.createList(list)
    .then(function() {
      self.newListCtrl.setValue('');
      return self.refreshList();
    });
  }

  /** Refresh items from server */
  refreshItems() {
    let self = this;

    if (null == self.dialogRef) {
      self.dialogRef = self.dialog.open(DialogLoaderComponent);
    }

    self.itemService.getItemsByList(self.selectedList.id)
    .then(function(resItems) {
      self.items = self.converterService.convertBoolean(resItems);
      self.dialogRef.close();
      self.dialogRef = null;
    });
  }

  /** Filter items by done */
  filterItems(done: boolean) : Item[] {
    if (this.items == null) {
      return new Array<Item>();
    }
    return this.items.filter(item => item.done == done);
  }

  /** Create item in db */
  addItem() {
    if ('' == this.newItemCtrl.value) {
      return;
    }

    // Create item object
    let item: Item = {
    id: null,
    name: this.newItemCtrl.value,
    done: false,
    date: moment().format("DD/MM/YYYY"),
    listId: this.selectedList.id
  }

  // Send item to server
  let self = this;

  if (null == self.dialogRef) {
    self.dialogRef = self.dialog.open(DialogLoaderComponent);
  }

  self.itemService.createItem(item)
  .then(function(res) {
    self.newItemCtrl.setValue('');
    return self.refreshItems();
  });
}

/** Set done to true */
checkItem(item:Item) {
  let self = this;

  if (null == self.dialogRef) {
    self.dialogRef = self.dialog.open(DialogLoaderComponent);
  }

  item.done = !item.done;
  self.itemService.updateItem(item).then(function(res) {
    self.dialogRef.close();
    self.dialogRef = null;
  });
}

toggleNewItemInput(show:boolean) {
  this.showNewItemInput = show;
}

/** Delete a list, sharedList data and associated items */
deleteList(list:List) {
  let self = this;

  if (null == self.dialogRef) {
    self.dialogRef = self.dialog.open(DialogLoaderComponent);
  }

  self.listService.deleteSharedListByList(list)
  .then(function() {
    return self.itemService.deleteItemsByList(list);
  })
  .then(function() {
    return self.listService.deleteList(list);
  })
  .then(function() {
    self.dialogRef.close();
    self.dialogRef = null;
    return self.refreshList();
  });
}

/** Delete an item */
deleteItem(item:Item) {
  let self = this;

  if (null == self.dialogRef) {
    self.dialogRef = self.dialog.open(DialogLoaderComponent);
  }

  self.itemService.deleteItem(item)
  .then(function(res) {
    return self.refreshItems();
  });
}

/** Open generic dialog to confirm delete */
openConfirmDialog(message:string, object:object, type:string) {
  let self = this;
  let dialogRef = this.dialog.open(DialogConfirmComponent, {
    data: {
      message: message,
      cancel: 'Annuler',
      validate: 'Supprimer',
      object: object
    }
  });

  dialogRef.afterClosed().subscribe(function(res) {
    if (!res) {
      return;
    }

    if (type == 'item') {
      return self.deleteItem(object as Item);
    } else if (type == 'list') {
      return self.deleteList(object as List);
    }
  });
}

/** Event on input select changes */
onSelectChange() {
  this.selectedList = this.inputSelectedList.value as List;
  return this.refreshItems();
}

/** Open share modal */
openShareModal() {
  let self = this;
  let dialogRef = this.dialog.open(DialogShareComponent, {
    data: {
      list: self.selectedList
    }
  });
}
}
