import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectionList } from "@angular/material/list";
import { NgxSpinnerService } from "ngx-spinner";
import List_Role from "src/app/contracts/role/List_Role";
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from "src/app/services/admin/alertify/alertify.service";
import { AuthorizationEndpointService } from "src/app/services/common/models/authorization-endpoint.service";
import { RoleService } from "src/app/services/common/models/role.service";
import { SpinnerType } from "../../base.component";
import { BaseDialog } from "../base/base-dialog";

@Component({
	selector: "app-authorize-menu-dialog",
	templateUrl: "./authorize-menu-dialog.component.html",
	styleUrls: ["./authorize-menu-dialog.component.scss"],
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {
	roles: List_Role[] = [];
	totalRoleCount: number;
	assignedRoles: string[];
	listRoles: { name: string; selected: boolean }[] = [];
	constructor(
		dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Data,
		private roleService: RoleService,
		private alertify: AlertifyService,
		private authorizationEndpointService: AuthorizationEndpointService,
		private spinner: NgxSpinnerService
	) {
		super(dialogRef);
	}

	async ngOnInit(): Promise<void> {
		const allRoles: { totalRoleCount: number; roles: Map<string, string> } = await this.roleService.getRoles(
			-1,
			-1,
			() => {},
			(errorMessage) =>
				this.alertify.message(errorMessage, {
					dismissOthers: true,
					messageType: AlertifyMessageType.Error,
					position: AlertifyPosition.TopRight,
				})
		);
		this.totalRoleCount = allRoles.totalRoleCount;
		for (const [key, value] of Object.entries(allRoles.roles)) {
			this.roles.push({ id: key, name: value });
		}

		this.assignedRoles = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName);

		this.listRoles = this.roles.map((r: any) => {
			return {
				name: r.name,
				selected: this.assignedRoles?.indexOf(r.name) > -1,
			};
		});

	}

	async assignRoles(rolesComponent: MatSelectionList) {
		this.spinner.show(SpinnerType.SquareJellyBox);
		const roles: string[] = rolesComponent.selectedOptions.selected.map((x) => x.value);

		await this.authorizationEndpointService.assignRoleEndpoint(
			this.data.menuName,
			roles,
			this.data.code,
			() => {
				this.alertify.message("Roller başarıyle eklendi", {
					dismissOthers: true,
					messageType: AlertifyMessageType.Success,
					position: AlertifyPosition.TopRight,
				});
			},
			(error) => {
				this.alertify.message(error, {
					dismissOthers: true,
					messageType: AlertifyMessageType.Error,
					position: AlertifyPosition.TopRight,
				});
			}
		);

		this.spinner.hide(SpinnerType.SquareJellyBox);
	}
}

export interface Data {
	code: string;
	name: string;
	menuName: string;
}

export enum AuthorizeMenuState {
	Yes,
	No,
}
