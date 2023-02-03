import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import List_Role from "src/app/contracts/role/List_Role";
import { AlertifyService, AlertifyMessageType, AlertifyPosition } from "src/app/services/admin/alertify/alertify.service";
import { DialogService } from "src/app/services/common/dialog.service";
import { RoleService } from "src/app/services/common/models/role.service";

@Component({
	selector: "app-list-roles",
	templateUrl: "./list-roles.component.html",
	styleUrls: ["./list-roles.component.scss"],
})
export class ListRolesComponent extends BaseComponent implements OnInit {
	constructor(
		spinner: NgxSpinnerService,
		private roleService: RoleService,
		private alertif: AlertifyService,
		private dialogService: DialogService
	) {
		super(spinner);
	}

	displayedColumns: string[] = ["name", "update", "delete"];

	dataSource: MatTableDataSource<List_Role>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	async ngOnInit() {
		await this.getRoles();
	}

	async getRoles() {
		this.showSpinner(SpinnerType.LineSpinFade);
		const allRoles: { totalRoleCount: number; roles: Map<string, string> } = await this.roleService.getRoles(
			this.paginator ? this.paginator.pageIndex : 0,
			this.paginator ? this.paginator.pageSize : 5,
			() => this.hideSpinner(SpinnerType.LineSpinFade),
			(errorMessage) =>
				this.alertif.message(errorMessage, {
					dismissOthers: true,
					messageType: AlertifyMessageType.Error,
					position: AlertifyPosition.TopRight,
				})
		);	

		const _rolesData: List_Role[] = [];

		for (const [key, value] of Object.entries(allRoles.roles)) {
			_rolesData.push({ id: key, name: value });
		}
		
		this.dataSource = new MatTableDataSource<List_Role>(_rolesData);
		this.paginator.length = allRoles.totalRoleCount;
	}

	async pageChanged() {
		await this.getRoles();
	}
}
