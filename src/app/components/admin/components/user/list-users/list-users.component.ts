import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import { AuthorizeUserDialogComponent } from "src/app/components/dialogs/authorize-user-dialog/authorize-user-dialog.component";
import List_User from "src/app/contracts/user/List_User";
import { AlertifyService, AlertifyMessageType, AlertifyPosition } from "src/app/services/admin/alertify/alertify.service";
import { DialogService } from "src/app/services/common/dialog.service";
import { UserService } from "src/app/services/common/models/user.service";
@Component({
	selector: "app-list-users",
	templateUrl: "./list-users.component.html",
	styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent extends BaseComponent implements OnInit {
	constructor(
		spinner: NgxSpinnerService,
		private userService: UserService,
		private alertif: AlertifyService,
		private dialogService: DialogService
	) {
		super(spinner);
	}

	displayedColumns: string[] = ["email", "userName", "nameSurname", "twoFactorEnabled", "role"];

	dataSource: MatTableDataSource<List_User>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	async ngOnInit() {
		await this.getUsers();
	}

	async getUsers() {
		this.showSpinner(SpinnerType.LineSpinFade);
		const allUsers: { totalUserCount: number; users: List_User[] } = await this.userService.getAllUsers(
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

		this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
		this.paginator.length = allUsers.totalUserCount;
	}

	async pageChanged() {
		await this.getUsers();
	}

	assignRole(id: string, username: string) {
		this.dialogService.openDialog({
			componentType: AuthorizeUserDialogComponent,
			data: { id: id, username: username },
			options: {
				width: "750px",
			},
			afterClosed: () => {},
		});
	}
}
