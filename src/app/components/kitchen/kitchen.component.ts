import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
    private snackbarService: SnackbarService
  ) {
    this.toolbarService.setTitle('Cuisine');
    this.toolbarService.setRoute('/kitchen');
    this.toolbarService.setHasReturn(false);
  }

  ngOnInit() {
  }

  public openSnackbar() {
    this.snackbarService.openSnackBar('Soon ! :p');
  }

}
