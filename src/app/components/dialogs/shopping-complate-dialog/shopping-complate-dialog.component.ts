import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseDialog } from "../base/base-dialog";

declare var $: any;

@Component({
	selector: "app-shopping-complate-dialog",
	templateUrl: "./shopping-complate-dialog.component.html",
	styleUrls: ["./shopping-complate-dialog.component.scss"],
})
export class ShoppingComplateDialogComponent extends BaseDialog<ShoppingComplateDialogComponent> implements OnDestroy {

	constructor(
		dialogRef: MatDialogRef<ShoppingComplateDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ShoppingComplateState
	) {
		super(dialogRef);
	}

	show:boolean = false;
	complate() {
		this.show = true;
	}

	ngOnDestroy(): void {
		if (!this.show) {
			$("#basketModal").modal("show");
		}
	}
}

export enum ShoppingComplateState {
	Yes,
	No,
}
