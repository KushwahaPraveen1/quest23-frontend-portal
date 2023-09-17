import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-popup',
  styleUrls: ['./confirmation-popup.component.css'],
  template: `
    <div>
      <div><p>Are you sure you want to submit the test?</p></div>
      <div style="float: right">
        <button mat-button (click)="clicked(false)">Cancel</button>
        <button mat-button color="primary" (click)="clicked(true)">Submit</button>
      </div>
    </div>
  `
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmationPopupComponent>) {
  }

  ngOnInit() {
  }

  clicked(force: boolean) {
    this.dialogRef.close({ finish: force });
  }

}
