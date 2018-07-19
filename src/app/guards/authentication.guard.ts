import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthentificationService } from '../services/authentification/authentification.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthentificationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authenticationService.isLogged()){
      return true;
    }
    return false;
  }

}
