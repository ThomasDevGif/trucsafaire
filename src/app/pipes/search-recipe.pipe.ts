import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe';

@Pipe({
  name: 'searchRecipe'
})
export class SearchRecipePipe implements PipeTransform {

  transform(recipes: Recipe[], filter: string): Recipe[] {
    if (!recipes || !filter) {
      return recipes;
    }

    return recipes.filter(recipe => recipe.name.toLowerCase().includes(filter.toLowerCase()));
  }

}
