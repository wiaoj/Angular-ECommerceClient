import { Component, OnInit, ViewChild } from "@angular/core";
import { ListRolesComponent } from "./list-roles/list-roles.component";

@Component({
	selector: "app-role",
	templateUrl: "./role.component.html",
	styleUrls: ["./role.component.scss"],
})
export class RoleComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	@ViewChild(ListRolesComponent) listComponents: ListRolesComponent; //içindeki child componenti elde ediyoruz
	createdRole(name: string) {
		this.listComponents.getRoles();
	}
}
