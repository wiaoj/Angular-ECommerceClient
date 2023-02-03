import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectionList } from "@angular/material/list";
import { NgxSpinnerService } from "ngx-spinner";
import List_Role from "src/app/contracts/role/List_Role";
import { AlertifyService, AlertifyMessageType, AlertifyPosition } from "src/app/services/admin/alertify/alertify.service";
import { RoleService } from "src/app/services/common/models/role.service";
import { UserService } from "src/app/services/common/models/user.service";
import { SpinnerType } from "../../base.component";
import { BaseDialog } from "../base/base-dialog";

@Component({
	selector: "app-authorize-user-dialog",
	templateUrl: "./authorize-user-dialog.component.html",
	styleUrls: ["./authorize-user-dialog.component.scss"],
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {
	roles: List_Role[] = [];
	totalRoleCount: number;
	assignedRoles: string[];
	listRoles: { name: string; selected: boolean }[] = [];
	constructor(
		dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Data,
		private roleService: RoleService,
		private userService: UserService,
		private alertify: AlertifyService,
		private spinner: NgxSpinnerService
	) {
		super(dialogRef);
	}

	async ngOnInit(): Promise<void> {
		this.spinner.show(SpinnerType.LineSpinFade);
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

		this.assignedRoles = await this.userService.getRolesToUser(this.data.id);

		this.listRoles = this.roles.map((r: any) => {
			return {
				name: r.name,
				selected: this.assignedRoles?.indexOf(r.name) > -1,
			};
		});

		this.spinner.hide(SpinnerType.LineSpinFade);
	}

	async assignRoles(rolesComponent: MatSelectionList) {
		this.spinner.show(SpinnerType.LineSpinFade);
		const roles: string[] = rolesComponent.selectedOptions.selected.map((x) => x.value);

		await this.userService.assignRoleToUser(
			this.data.id,
			roles,
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

		this.spinner.hide(SpinnerType.LineSpinFade);
	}
}

export interface Data {
	id: string;
  username: string;
}
