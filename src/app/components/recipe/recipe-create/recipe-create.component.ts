import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

  public recipeForm: FormGroup;
  public recipeNameCtrl: FormControl;
  public recipeDescriptionCtrl: FormControl;
  public recipeDifficultyCtrl: FormControl;
  public recipeTimeCtrl: FormControl;

  public difficultyMark: number = 1;

  constructor(
    private fb: FormBuilder,
    private toolbarService: ToolbarService
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
  }

  public createRecipe() {
    console.log('create recipe');
  }

}
