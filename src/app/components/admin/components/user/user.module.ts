import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete/delete-directive.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    UserComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild([{ path: "", component: UserComponent }]),
    MatIconModule,
		MatTableModule,
		MatPaginatorModule,
		DeleteDirectiveModule,
		MatTooltipModule,
    MatButtonModule
  ]
})
export class UserModule { }
