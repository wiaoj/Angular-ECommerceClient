import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { HomeComponent } from './components/ui/components/home/home.component';

const ADMIN_COMPONENTS_PATH = './components/admin/components/';
const UI_COMPONENTS_PATH = './components/ui/components/';
const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      //boş verdik linkde admin olunca direkt buraya ulaşıyor
      { path: '', component: DashboardComponent },
      {
        path: 'customers',
        loadChildren: () =>
          import(`${ADMIN_COMPONENTS_PATH}customers/customers.module`).then(
            (module) => module.CustomersModule
            //lazy loadinge de sebep oluyor
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import(`${ADMIN_COMPONENTS_PATH}products/products.module`).then(
            (module) => module.ProductsModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import(`${ADMIN_COMPONENTS_PATH}orders/orders.module`).then(
            (module) => module.OrdersModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import(`${ADMIN_COMPONENTS_PATH}dashboard/dashboard.module`).then(
            (module) => module.DashboardModule
          ),
      },
    ],
  },
  {
    //anasayfa çalışmalarında direkt component veriliyor
    path: '',
    component: HomeComponent,
  },
  {
    path: 'basket',
    loadChildren: () =>
      import(`${UI_COMPONENTS_PATH}baskets/baskets.module`).then(
        (module) => module.BasketsModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import(`${UI_COMPONENTS_PATH}products/products.module`).then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import(`${UI_COMPONENTS_PATH}login/login.module`).then(
        (module) => module.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import(`${UI_COMPONENTS_PATH}register/register.module`).then(
        (module) => module.RegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
