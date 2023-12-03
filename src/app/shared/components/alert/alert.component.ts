import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { AlertData } from 'src/app/core/models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  myData: AlertData;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: AlertData,
    @Inject(MatSnackBarRef) public snackBarRef: any
  ) {
    this.myData = data;
  }
}
