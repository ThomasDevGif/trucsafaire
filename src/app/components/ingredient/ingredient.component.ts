import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogIngredientEditComponent } from './dialog-ingredient-edit/dialog-ingredient-edit.component';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  private dialogRef: any = null;

  public ingredients: Ingredient[] = [
    { id: 1, name: 'Ingrédient 1' },
    { id: 2, name: 'Ingrédient 2' },
    { id: 3, name: 'Ingrédient 3' }
  ];

  // New item
  public showNewItemInput: boolean = false;
  public newItemForm: FormGroup;
  public newItemCtrl: FormControl;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.newItemCtrl = fb.control('', [ Validators.required ]);
    this.newItemForm = fb.group({
      newItem: this.newItemCtrl
    });
  }

  ngOnInit() {
  }

  // TODO
  private refreshIngredients() {

  }

  // TODO
  public createIngredient() {
    this.ingredients.push({id: null, name: this.newItemCtrl.value});
    this.newItemCtrl.setValue('');
  }

  // TODO
  private removeIngredient(ingredient: Ingredient) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
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
        self.removeIngredient(res.ingredient);
      }
    });
  }

}
