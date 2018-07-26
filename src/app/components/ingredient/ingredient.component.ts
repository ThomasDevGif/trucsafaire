import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogIngredientEditComponent } from './dialog-ingredient-edit/dialog-ingredient-edit.component';
import { DialogLoaderComponent } from '../dialog-loader/dialog-loader.component';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  private dialogRef: any = null;

  public ingredients: Ingredient[] = [];
  // = [
  //   { id: 1, name: 'Ingrédient 1' },
  //   { id: 2, name: 'Ingrédient 2' },
  //   { id: 3, name: 'Ingrédient 3' }
  // ];

  // New item
  public showNewItemInput: boolean = false;
  public newItemForm: FormGroup;
  public newItemCtrl: FormControl;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toolbarService: ToolbarService,
    private ingredientService: IngredientService
  ) {
    this.toolbarService.setTitle('Ingredients');
    this.toolbarService.setHasReturn(true);

    this.newItemCtrl = fb.control('', [ Validators.required ]);
    this.newItemForm = fb.group({
      newItem: this.newItemCtrl
    });
  }

  ngOnInit() {
    this.refreshIngredients();
  }

  /** Refresh ingredients list from server */
  private refreshIngredients() {
    if (null == this.dialogRef) {
      this.dialogRef = this.dialog.open(DialogLoaderComponent);
    }

    this.ingredientService.getIngredients()
    .then((resIngredients) => {
      this.ingredients = resIngredients;
      this.dialogRef.close();
      this.dialogRef = null;
    })
  }

  /** Insert ingredient in database */
  public createIngredient() {
    if (null == this.dialogRef) {
      this.dialogRef = this.dialog.open(DialogLoaderComponent);
    }

    this.ingredientService.createIngredient({id: null, name: this.newItemCtrl.value})
    .then((res) => {
      this.ingredients.push({id: null, name: this.newItemCtrl.value});
      this.newItemCtrl.setValue('');
      this.dialogRef.close();
      this.dialogRef = null;
    })
  }

  /** Delete ingredient in database */
  private removeIngredient(ingredient: Ingredient) {
    this.dialogRef = this.dialog.open(DialogLoaderComponent);

    this.ingredientService.deleteIngredient(ingredient)
    .then((res) => {
      this.refreshIngredients();
    })
  }

  /** Open modal to edit or delete ingredient */
  public openEditDialog(ingredient: Ingredient) {
    let self = this;
    let dialogRef = this.dialog.open(DialogIngredientEditComponent, {
      data: {
        ingredient: ingredient
      }
    });

    dialogRef.afterClosed().subscribe(function(res) {
      if (res.action) {
        self.removeIngredient(ingredient);
      }
    });
  }

}
