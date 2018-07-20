import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  public recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private toolbarService: ToolbarService
  ) {
    this.route.queryParams.subscribe(params => {
      this.recipe = JSON.parse(params['recipe']) as Recipe;

      this.toolbarService.setTitle(this.recipe.name);
      this.toolbarService.setRoute('/recipes');
      this.toolbarService.setHasReturn(true);
    });
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

}
