import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-loader',
  templateUrl: './dialog-loader.component.html',
  styleUrls: ['./dialog-loader.component.scss']
})
export class DialogLoaderComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogLoaderComponent>
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

}
