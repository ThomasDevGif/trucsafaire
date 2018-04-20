import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { List } from '../../models/list';
import { SharedList } from '../../models/sharedList';
import { User } from '../../models/user';

@Injectable()
export class ListService {

  private baseUrl = './assets/server/';
  private headers = new Headers();

  constructor(private http: Http) { }

  // LIST
  createList(list: List) : Promise<any> {
    return this.http.post(this.baseUrl + 'list/createList.php', list)
    .toPromise()
    .catch(this.handleError);
  }

  getListsByUser(user: User) : Promise<List[]> {
    return this.http.post(this.baseUrl + 'list/getListsByUser.php', user)
    .toPromise()
    .then(res => res.json() as List[])
    .catch(this.handleError);
  }

  deleteList(list: List) : Promise<any> {
    return this.http.post(this.baseUrl + 'list/deleteList.php', list.id)
    .toPromise()
    .catch(this.handleError);
  }

  // sharedList
  createSharedList(shareList: SharedList) : Promise<any> {
    return this.http.post(this.baseUrl + 'sharedList/createSharedList.php', shareList)
    .toPromise()
    .catch(this.handleError);
  }

  getSharedUsersByList(list: List) : Promise<any> {
    return this.http.post(this.baseUrl + 'sharedList/getSharedUsersByList.php', list.id)
    .toPromise()
    .then(res => res.json() as User[])
    .catch(this.handleError);
  }

  getSharedListsByUser(user: User) : Promise<any> {
    return this.http.post(this.baseUrl + 'sharedList/getSharedListsByUser.php', user.id)
    .toPromise()
    .then(res => res.json() as List[])
    .catch(this.handleError);
  }

  deleteSharedListByList(list: List) : Promise<any> {
    return this.http.post(this.baseUrl + 'sharedList/deleteSharedListByList.php', list.id)
    .toPromise()
    .catch(this.handleError);
  }

  deleteSharedUserByList(user: User, list: List) : Promise<any> {
    return this.http.post(this.baseUrl + 'sharedList/deleteSharedUserByList.php', {
      userId: user.id,
      listId: list.id
    })
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
