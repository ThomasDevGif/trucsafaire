import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogLoaderComponent } from '../../dialog-loader/dialog-loader.component';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { AuthentificationService } from '../../../services/authentification/authentification.service';
import { Recipe } from '../../../models/recipe';
import { Ingredient } from '../../../models/ingredient';
import { RecipeIngredient } from '../../../models/recipeIngredient';
import { User } from '../../../models/user';

import * as moment from 'moment';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

  public dialogRef: any = null;
  private loggedUser: User;

  public recipeForm: FormGroup;
  public recipeNameCtrl: FormControl;
  public recipeDescriptionCtrl: FormControl;
  public recipeDifficultyCtrl: FormControl;
  public recipeTimeCtrl: FormControl;

  public difficultyMark: number = 1;
  public ingredients: Ingredient[];
  public selectedIngredients: Ingredient[] = [];

  public autocompleteControl: FormControl = new FormControl();
  public filteredIngredients: Observable<Ingredient[]>;

  constructor(
    private fb: FormBuilder,
    private toolbarService: ToolbarService,
    private snackbarService: SnackbarService,
    private recipeService: RecipeService,
    private authentificationService: AuthentificationService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.toolbarService.setTitle('Ajouter une recette');
    this.toolbarService.setRoute('/recipes');
    this.toolbarService.setHasReturn(true);

    this.recipeNameCtrl = fb.control('', [ Validators.required ]);
    this.recipeDescriptionCtrl = fb.control('', [ Validators.required ]);
    this.recipeDifficultyCtrl = fb.control('', [ Validators.required ]);
    this.recipeTimeCtrl = fb.control('', [ Validators.required ]);

    this.recipeForm = fb.group({
      recipeName: this.recipeNameCtrl,
      recipeDescription: this.recipeDescriptionCtrl,
      recipeDifficulty: this.recipeDifficultyCtrl,
      recipeTime: this.recipeTimeCtrl
    });
  }

  ngOnInit() {
    this.loggedUser = this.authentificationService.getUser();
    this.getIngredients();

    // Init filter for autocomplete input
    this.filteredIngredients = this.autocompleteControl.valueChanges
      .pipe(
      startWith<string | Ingredient>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.filter(name) : this.ingredients.slice())
      );
  }

  /** Autocomplete ingredients using name */
  private filter(name: string): Ingredient[] {
    let ingredients = this.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().indexOf(name.toLowerCase()) === 0);

    return ingredients;
  }

  /** Function do display values in autocomplete input */
  displayFn(ingredient?: Ingredient): string | undefined {
    return ingredient ? ingredient.name : undefined;
  }

  /** Inser recipe in database */
  public createRecipe() {
    this.dialogRef = this.dialog.open(DialogLoaderComponent);

    var recipe: Recipe = {
      id: null,
      name: this.recipeNameCtrl.value,
      description: this.recipeDescriptionCtrl.value,
      difficulty: this.recipeDifficultyCtrl.value,
      time: this.recipeTimeCtrl.value,
      date: moment().format("DD/MM/YYYY"),
      userId: this.loggedUser.id
    };

    this.recipeService.createRecipe(recipe)
    .then(() => {
      this.dialogRef.close();
      this.dialogRef = null;
      this.snackbarService.openSnackBar('\u2714 La recette a bien été ajoutée');
      this.router.navigate(['/recipes']);
    });
  }

  public getIngredients() {
    this.ingredients = [
      {id: 1, name: 'Ingredient'},
      {id: 2, name: 'Pizza'},
      {id: 3, name: 'Pouet'},
    ];
  }

  public addSelectedIngredient() {
    if (this.autocompleteControl.value == null || this.autocompleteControl.value === '') {
      return;
    }

    if (this.selectedIngredients.indexOf(this.autocompleteControl.value) < 0) {
      this.selectedIngredients.push(this.autocompleteControl.value);
      this.autocompleteControl.setValue('');
    }
  }

  public removeSelectedIngredient(ingredient: Ingredient) {
    this.selectedIngredients.splice(this.selectedIngredients.indexOf(this.autocompleteControl.value), 1);
  }

}
