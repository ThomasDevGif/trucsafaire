import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

@Injectable()
export class UserService {

  private baseUrl = './assets/server/';
  private headers = new Headers();

  constructor(private http: Http) { }

  public createUser(user: User) : Promise<any> {
    return this.http.post(this.baseUrl + 'user/createUser.php', user)
    .toPromise()
    .catch(this.handleError);
  }

  public getUserByName(user: User) : Promise<User[]> {
    return this.http.post(this.baseUrl + 'user/getUserByName.php', user)
    .toPromise()
    .then(res => res.json() as User[])
    .catch(this.handleError);
  }

  public getUserByLogin(user: User) : Promise<User[]> {
    return this.http.post(this.baseUrl + 'user/getUserByLogin.php', user)
    .toPromise()
    .then(res => res.json() as User[])
    .catch(this.handleError);
  }

  public getUsers() : Promise<User[]> {
    return this.http.get(this.baseUrl + 'user/getUsers.php')
    .toPromise()
    .then(res => res.json() as User[])
    .catch(this.handleError);
  }

  public updateUserPassword(user: User) : Promise<any> {
    return this.http.post(this.baseUrl + 'user/updateUserPassword.php', user)
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
