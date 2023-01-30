import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersComponent } from "./orders.component";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ListOrdersComponent } from "./list-orders/list-orders.component";
import { DeleteDirectiveModule } from "src/app/directives/admin/delete/delete-directive.module";

@NgModule({
	declarations: [OrdersComponent, ListOrdersComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: "", component: OrdersComponent }]),
		MatIconModule,
		MatTableModule,
		MatPaginatorModule,
		DeleteDirectiveModule
	],
})
export class OrdersModule {}
