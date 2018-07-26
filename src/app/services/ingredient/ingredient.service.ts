import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Ingredient } from '../../models/ingredient';

@Injectable()
export class IngredientService {

  private baseUrl = './assets/server/';
  private headers = new Headers();

  constructor(private http: Http) { }

  public createIngredient(ingredient: Ingredient) : Promise<any> {
    return this.http.post(this.baseUrl + 'ingredient/createIngredient.php', ingredient)
    .toPromise()
    .catch(this.handleError);
  }

  public getIngredients() : Promise<any> {
    return this.http.get(this.baseUrl + 'ingredient/getIngredients.php')
    .toPromise()
    .then(res => res.json() as Ingredient[])
    .catch(this.handleError);
  }

  public updateIngredient(ingredient: Ingredient) : Promise<any> {
    return this.http.post(this.baseUrl + 'ingredient/updateIngredient.php', ingredient)
    .toPromise()
    .catch(this.handleError);
  }

  public deleteIngredient(ingredient: Ingredient) : Promise<any> {
    return this.http.post(this.baseUrl + 'ingredient/deleteIngredient.php', ingredient)
    .toPromise()
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
