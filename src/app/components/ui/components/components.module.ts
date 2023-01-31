import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { MatIconModule } from '@angular/material/icon';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { PasswordUpdateModule } from './password-update/password-update.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProductsModule,
    BasketsModule,
    RegisterModule,
    LoginModule, 
    MatIconModule,
    PasswordResetModule,
    PasswordUpdateModule
  ],
  exports: [
    BasketsModule
  ]
})
export class ComponentsModule {}
