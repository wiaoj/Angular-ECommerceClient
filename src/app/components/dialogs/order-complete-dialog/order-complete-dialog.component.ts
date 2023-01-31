import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-order-complete-dialog',
  templateUrl: './order-complete-dialog.component.html',
  styleUrls: ['./order-complete-dialog.component.scss']
})
export class OrderCompleteDialogComponent extends BaseDialog<OrderCompleteDialogComponent> {

  constructor(dialogRef: MatDialogRef<OrderCompleteDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: OrderCompleteState
	) {
		super(dialogRef);
  }

  complete(){

  }
}

export enum OrderCompleteState {
	Yes,
	No,
}
