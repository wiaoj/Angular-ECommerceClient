import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent } from "src/app/components/base.component";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { ApplicationService } from "src/app/services/common/models/application.service";
import Menu, { Action } from "src/app/contracts/application-configurations/menu";
import { DialogService } from "src/app/services/common/dialog.service";
import { AuthorizeMenuDialogComponent } from "src/app/components/dialogs/authorize-menu-dialog/authorize-menu-dialog.component";

interface MenuFlatNode {
	expandable: boolean;
	level: number;
	name: string;
}
interface ITreeMenu {
	name?: string;
	actions?: ITreeMenu[];
	code?: string;
}

@Component({
	selector: "app-authorize-menu",
	templateUrl: "./authorize-menu.component.html",
	styleUrls: ["./authorize-menu.component.scss"],
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit {
	constructor(
		spinner: NgxSpinnerService,
		private applicationService: ApplicationService,
		private dialogService: DialogService
	) {
		super(spinner);
	}

	assignRole(code: string, name: string) {
		this.dialogService.openDialog({
			componentType: AuthorizeMenuDialogComponent,
			data: { code, name },
			options: {
				width: "48rem",
			},
			afterClosed: () => {},
		});
	}

	hasChild = (_: number, node: MenuFlatNode) => node.expandable;

	async ngOnInit(): Promise<void> {
		this.dataSource.data = (await this.applicationService.getAuthorizeDefinitionEndpoints()).map((menu) => {
			const treeMenu: ITreeMenu = {
				name: menu.name,
				actions: menu.actions.map((action) => {
					const _treeMenu: ITreeMenu = {
						name: action.definition,
						code: action.code,
					};
					return _treeMenu;
				}),
			};
			return treeMenu;
		});
	}

	treeControl = new FlatTreeControl<MenuFlatNode>(
		(menu) => menu.level,
		(menu) => menu.expandable
	);

	treeFlattener = new MatTreeFlattener(
		(menu: ITreeMenu, level: number) => {
			return {
				expandable: menu.actions?.length > 0,
				level: level,
				name: menu.name,
				code: menu.code,
			};
		},
		(menu) => menu.level,
		(menu) => menu.expandable,
		(menu) => menu.actions
	);

	dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
}
