import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';

@Injectable()
export class RecipeService {

  private baseUrl = './assets/server/';
  private headers = new Headers();

  constructor(private http: Http) { }

  public createRecipe(recipe: Recipe) : Promise<any> {
    return this.http.post(this.baseUrl + 'recipe/createRecipe.php', recipe)
    .toPromise()
    .catch(this.handleError);
  }

  public getRecipes() : Promise<any> {
    return this.http.get(this.baseUrl + 'recipe/getRecipes.php')
    .toPromise()
    .then(res => res.json() as Recipe[])
    .catch(this.handleError);
  }

  public getRecipesByName(recipe: Recipe) : Promise<User[]> {
    return this.http.post(this.baseUrl + 'recipe/getRecipesByName.php', recipe)
    .toPromise()
    .then(res => res.json() as Recipe[])
    .catch(this.handleError);
  }

  /**
   * Generic function to reject promise
   */
  private handleError(error: any): Promise<any> {
    console.error('[ERROR] ', error);
    return Promise.reject(error.message || error);
  }

}
