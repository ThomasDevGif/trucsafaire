import { Component, OnInit, HostListener } from '@angular/core';

class NavbarItem {
  title: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public items: NavbarItem[] =
    [{
      title: 'Profil',
      link: 'profile',
      icon: 'person'
    },
    {
      title: 'Listes',
      link: '',
      icon: 'list'
    },
    {
      title: 'Cuisine',
      link: 'kitchen',
      icon: 'local_dining'
    }];

  constructor() { }

  ngOnInit() {
  }
  
}
