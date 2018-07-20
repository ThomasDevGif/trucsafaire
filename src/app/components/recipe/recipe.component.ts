import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  public recipes: Recipe[] = [
    {id: 1, name: 'Recette 1', difficulty: 1, date: '01/01/2018', time: 25, userId: 1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {id: 2, name: 'Recette 2', difficulty: 4, date: '01/01/2018', time: 125, userId: 1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {id: 3, name: 'Recette 3', difficulty: 2, date: '01/01/2018', time: 40, userId: 1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {id: 4, name: 'Recette 4', difficulty: 3, date: '01/01/2018', time: 60, userId: 1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  ]

  constructor(
    private router: Router,
    private toolbarService: ToolbarService
  ) {
    this.toolbarService.setTitle('Recettes');
    this.toolbarService.setHasReturn(false);
  }

  ngOnInit() {
  }

  /** Convert difficulty number to emoji */
  public getEmoji(recipe: Recipe): string {
    var emoji;

    switch(recipe.difficulty) {
      case 1:
      emoji = ':satisfied:';
      break;
      case 2:
      emoji = ':grinning:';
      break;
      case 3:
      emoji = ':grimacing:';
      break;
      case 4:
      emoji = ':rage:';
      break;
    }

    return emoji;
  }

  /** Open a recipe on click */
  openRecipeDetails(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        // Send json to prevent bug with recipe subobjects
        recipe: JSON.stringify(recipe)
      }
    };
    this.router.navigate(['recipe-details'], navigationExtras);
  }


}
