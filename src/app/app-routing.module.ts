import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/admin/components/dashboard/dashboard.component";
import { LayoutComponent } from "./components/admin/layout/layout.component";
import { HomeComponent } from "./components/ui/components/home/home.component";
import { AuthGuard } from "./guards/common/auth.guard";
import { _isAuthenticated } from "./services/common/auth.service";

const ADMIN_COMPONENTS_PATH = "./components/admin/components/";
const UI_COMPONENTS_PATH = "./components/ui/components/";
const routes: Routes = [
	{
		path: "admin",
		component: LayoutComponent,
		children: [
			{ path: "", redirectTo: "dashboard" },
			//boş verdik linkde admin olunca direkt buraya ulaşıyor
			{ path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
			{
				path: "customers",
				loadChildren: () =>
					import(`${ADMIN_COMPONENTS_PATH}customers/customers.module`).then(
						(module) => module.CustomersModule
						//lazy loadinge de sebep oluyor
					),
				canActivate: [AuthGuard],
			},
			{
				path: "products",
				loadChildren: () =>
					import(`${ADMIN_COMPONENTS_PATH}products/products.module`).then((module) => module.ProductsModule),
				canActivate: [AuthGuard],
			},
			{
				path: "orders",
				loadChildren: () =>
					import(`${ADMIN_COMPONENTS_PATH}orders/orders.module`).then((module) => module.OrdersModule),
				canActivate: [AuthGuard],
			},
			{
				path: "dashboard",
				loadChildren: () =>
					import(`${ADMIN_COMPONENTS_PATH}dashboard/dashboard.module`).then((module) => module.DashboardModule),
				canActivate: [AuthGuard],
			},
			{
				path: "authorize-menu",
				loadChildren: () =>
					import(`${ADMIN_COMPONENTS_PATH}authorize-menu/authorize-menu.module`).then((module) => module.AuthorizeMenuModule),
				canActivate: [AuthGuard],
			},
			{
				path: "roles",
				loadChildren: () =>
					import(`${ADMIN_COMPONENTS_PATH}role/role.module`).then((module) => module.RoleModule),
				canActivate: [AuthGuard],
			},
			{
				path: "users",
				loadChildren: () =>
					import(`${ADMIN_COMPONENTS_PATH}user/user.module`).then((module) => module.UserModule),
				canActivate: [AuthGuard],
			},
		],
		canActivate: [AuthGuard],
	},
	{
		//anasayfa çalışmalarında direkt component veriliyor
		path: "",
		component: HomeComponent,
	},
	{
		path: "basket",
		loadChildren: () => import(`${UI_COMPONENTS_PATH}baskets/baskets.module`).then((module) => module.BasketsModule),
	},
	{
		path: "products",
		redirectTo: "products/1"
		// loadChildren: () => import(`${UI_COMPONENTS_PATH}products/products.module`).then((module) => module.ProductsModule),
	},
	{
		path: "products/:pageNo",
		loadChildren: () => import(`${UI_COMPONENTS_PATH}products/products.module`).then((module) => module.ProductsModule),
	},
	{
		path: "login",
		loadChildren: () => import(`${UI_COMPONENTS_PATH}login/login.module`).then((module) => module.LoginModule),
	},
	{
		path: "password-reset",
		loadChildren: () => import(`${UI_COMPONENTS_PATH}password-reset/password-reset.module`).then((module) => module.PasswordResetModule),
	},
	{
		path: "password-update/:userId/:resetToken",
		loadChildren: () => import(`${UI_COMPONENTS_PATH}password-update/password-update.module`).then((module) => module.PasswordUpdateModule),
	},
	{
		path: "register",
		loadChildren: () => import(`${UI_COMPONENTS_PATH}register/register.module`).then((module) => module.RegisterModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
