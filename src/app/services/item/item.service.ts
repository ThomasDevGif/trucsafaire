import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { List } from '../../models/list';
import { Item } from '../../models/item';


@Injectable()
export class ItemService {

  private baseUrl = './assets/server/';
  private headers = new Headers();

  constructor(private http: Http) { }

  // ITEM
  createItem(item: Item) : Promise<any> {
    return this.http.post(this.baseUrl + 'item/createItem.php', item)
    .toPromise()
    .catch(this.handleError);
  }

  getItems() : Promise<Item[]> {
    return this.http.get(this.baseUrl + 'item/getItems.php')
    .toPromise()
    .then(res => res.json() as Item[])
    .catch(this.handleError);
  }

  getItemsByList(listId) : Promise<Item[]> {
    return this.http.post(this.baseUrl + 'item/getItemsByList.php', listId)
    .toPromise()
    .then(res => res.json() as Item[])
    .catch(this.handleError);
  }

  deleteItem(item: Item) : Promise<any> {
    return this.http.post(this.baseUrl + 'item/deleteItem.php', item.id)
    .toPromise()
    .catch(this.handleError);
  }

  deleteItemsByList(list: List) : Promise<any> {
    return this.http.post(this.baseUrl + 'item/deleteItems.php', list.id)
    .toPromise()
    .catch(this.handleError);
  }

  updateItem(item: Item) : Promise<any> {
    return this.http.post(this.baseUrl + 'item/updateItem.php', item)
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
