import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleComponent } from "./role.component";
import { RouterModule } from "@angular/router";
import { ListRolesComponent } from "./list-roles/list-roles.component";
import { CreateRoleComponent } from "./create-role/create-role.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { DeleteDirectiveModule } from "src/app/directives/admin/delete/delete-directive.module";
import { FileUploadModule } from "src/app/services/common/file-upload/file-upload.module";

@NgModule({
	declarations: [RoleComponent, ListRolesComponent, CreateRoleComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: "", component: RoleComponent }]),
		MatSidenavModule,
		MatInputModule,
		MatIconModule,
		MatFormFieldModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule,
		FileUploadModule,
		DeleteDirectiveModule,
	],
})
export class RoleModule {}
