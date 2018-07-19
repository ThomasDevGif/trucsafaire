import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar/toolbar.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  constructor(
    private toolbarService: ToolbarService
  ) {
    this.toolbarService.setTitle('Cuisine');
    this.toolbarService.setRoute('/kitchen');
    this.toolbarService.setHasReturn(false);
  }

  ngOnInit() {
  }

}
