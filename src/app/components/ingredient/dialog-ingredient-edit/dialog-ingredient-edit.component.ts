import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IngredientService } from '../../../services/ingredient/ingredient.service';

@Component({
  selector: 'app-dialog-ingredient-edit',
  templateUrl: './dialog-ingredient-edit.component.html',
  styleUrls: ['./dialog-ingredient-edit.component.scss']
})
export class DialogIngredientEditComponent implements OnInit {

  public ingredientForm: FormGroup;
  public ingredientNameCtrl: FormControl;

  public renamed: boolean = false;
  public loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogIngredientEditComponent>,
    private fb: FormBuilder,
    private ingredientService: IngredientService
  ) {
    this.ingredientNameCtrl = fb.control('', [ Validators.required ]);
    this.ingredientForm = fb.group({
      ingredientName: this.ingredientNameCtrl
    });

    this.ingredientNameCtrl.setValue(this.data.ingredient.name);
  }

  ngOnInit() {
  }

  public renameIngredient() {
    this.loading = true;

    this.data.ingredient.name = this.ingredientNameCtrl.value;
    this.ingredientService.updateIngredient(this.data.ingredient)
    .then((res) => {
      this.renamed = true;
      this.loading = false;
    })
  }

  public close(response:boolean) {
    this.dialogRef.close(response);
  }

}
