import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

@Injectable()
export class AuthentificationService {

  constructor(private router: Router) { }

  public isLogged(): boolean {
    return !!localStorage.getItem('user');
  }

  public login(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/profile']);
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  public getUser() : User {
    return JSON.parse(localStorage.getItem('user')) as User;
  }

}
