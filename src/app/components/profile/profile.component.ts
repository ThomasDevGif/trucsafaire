import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedUser: User;

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
    // If no logged user in local storage, redirect to login page
    this.loggedUser = this.authentificationService.getUser();
    if (undefined == this.loggedUser) {
      this.router.navigate(['/login'])
    }
  }

  logout() {
    this.authentificationService.logout();
  }

}
