import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsModule } from "./products/products.module";
import { OrdersModule } from "./orders/orders.module";
import { CustomersModule } from "./customers/customers.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { AuthorizeMenuModule } from "./authorize-menu/authorize-menu.module";
import { MatIconModule } from "@angular/material/icon";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ProductsModule,
		CustomersModule,
		OrdersModule,
		DashboardModule,
		AuthorizeMenuModule,
		MatIconModule,
		RoleModule,
		UserModule
	],
})
export class ComponentsModule {}
