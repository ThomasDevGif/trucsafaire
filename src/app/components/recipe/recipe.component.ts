import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { RecipeService } from '../../services/recipe/recipe.service';
import { RecipeDialogSearchComponent } from './recipe-dialog-search/recipe-dialog-search.component';
import { DialogLoaderComponent } from '../dialog-loader/dialog-loader.component';
import { Recipe } from '../../models/recipe';

declare var $: any;

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  public dialogRef: any = null;

  public recipes: Recipe[] = [];
  // public recipes: Recipe[]  = [
  //   {id: 1, name: 'Recette 1', difficulty: 1, date: '01/01/2018', time: 25, userId: 1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  //   {id: 2, name: 'Recette 2', difficulty: 4, date: '01/01/2018', time: 125, userId: 1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  //   {id: 3, name: 'Recette 3', difficulty: 2, date: '01/01/2018', time: 40, userId: 1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  //   {id: 4, name: 'Recette 4 recette recette recette recette', difficulty: 3, date: '01/01/2018', time: 60, userId: 1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  // ]
  public searchRecipeValue: string;

  constructor(
    private router: Router,
    private toolbarService: ToolbarService,
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {
    this.toolbarService.setTitle('Recettes');
    this.toolbarService.setRoute('/kitchen');
    this.toolbarService.setHasReturn(true);
  }

  ngOnInit() {
    this.refreshRecipes();
  }

  private refreshRecipes() {
    if (null == this.dialogRef) {
      this.dialogRef = this.dialog.open(DialogLoaderComponent);
    }

    this.recipeService.getRecipes()
    .then((resRecipes) => {
      this.recipes = resRecipes;
      this.dialogRef.close();
      this.dialogRef = null;
    });
  }

  /** Open a recipe on click */
  public openRecipeDetails(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        // Send json to prevent bug with recipe subobjects
        recipe: JSON.stringify(recipe)
      }
    };
    this.router.navigate(['recipe-details'], navigationExtras);
  }

  public openDialogSearch() {
    var dialogRef = this.dialog.open(RecipeDialogSearchComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) return;

      if (res.search) {
        this.searchRecipeValue = res.value;
      }
    })
  }


}
