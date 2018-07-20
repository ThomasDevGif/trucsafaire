import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  public openSnackBar(message: string) {
    this.snackbar.open(message, null, {
      duration: 1500
    });
  }

}
