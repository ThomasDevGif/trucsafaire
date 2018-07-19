import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ToolbarService } from '../../services/toolbar/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  public title: string = '';
  public route: string = '';
  public hasReturn: boolean = false;

  private titleSubcription: Subscription;
  private routeSubcription: Subscription;
  private hasReturnSubcription: Subscription;

  constructor(
    private router: Router,
    private toolbarService: ToolbarService
  ) {
    this.titleSubcription = this.toolbarService.getTitle().subscribe(title => {
      this.title = title;
    });
    this.routeSubcription = this.toolbarService.getRoute().subscribe(route => {
      this.route = route;
    });
    this.hasReturnSubcription = this.toolbarService.getHasReturn().subscribe(hasReturn => {
      this.hasReturn = hasReturn;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.titleSubcription.unsubscribe();
    this.routeSubcription.unsubscribe();
    this.hasReturnSubcription.unsubscribe();
  }

  public return() {
    this.router.navigate([this.route]);
  }
}
