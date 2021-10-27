import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AppUtilService {
  private durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar) {}

  public showNotification(message: string): void {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }
}
