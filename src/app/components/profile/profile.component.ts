import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
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
    private toolbarService: ToolbarService,
    private router: Router
  ) {
    this.toolbarService.setTitle('Profil');
    this.toolbarService.setHasReturn(false);
  }

  ngOnInit() {
    this.loggedUser = this.authentificationService.getUser();
  }

  logout() {
    this.authentificationService.logout();
  }

}
