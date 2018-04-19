import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

@Injectable()
export class AuthentificationService {

  constructor(private router: Router) { }

  login(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser() : User {
    return JSON.parse(localStorage.getItem('user')) as User;
  }

}
