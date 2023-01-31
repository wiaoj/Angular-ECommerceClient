import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseDialog } from "../base/base-dialog";

@Component({
	selector: "app-authorize-menu-dialog",
	templateUrl: "./authorize-menu-dialog.component.html",
	styleUrls: ["./authorize-menu-dialog.component.scss"],
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> {
	constructor(
		dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Data
	) {
		super(dialogRef);
	}
}

export interface Data {
	code: string;
	name: string;
}

export enum AuthorizeMenuState {
	Yes,
	No,
}
