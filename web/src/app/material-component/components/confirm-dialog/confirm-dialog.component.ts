import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  message = '';
  subMessage = null;
  matTooltip = '';
  matTooltipPosition = 'below';
  colorOK = 'primary';
  colorCancel = 'warn';
  description = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private messageBlock: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    public dialog: MatDialog,
  ) {
    this.initializeMessages();
  }


  ngOnInit(): void {
  }

  initializeMessages =  () => {
    this.message = this.messageBlock.message;
    this.matTooltip = this.messageBlock.matTooltip;
    this.matTooltipPosition = this.messageBlock.matTooltipPosition;
    this.colorOK = this.messageBlock.colorOK;
    this.colorCancel = this.messageBlock.colorCancel;
    this.subMessage = this.messageBlock?.subMessage;

    this.description = this.messageBlock?.description;
  }

}
