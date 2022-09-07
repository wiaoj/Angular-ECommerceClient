import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateProductComponent } from './create-product/create-product.component';
import { MatInputModule } from '@angular/material/input';
import { ListProductsComponent } from './list-products/list-products.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete/delete.directive';
import { DialogModule } from 'src/app/components/dialogs/dialog.module';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListProductsComponent,
    DeleteDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent }]),
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    FileUploadModule,
  ],
})
export class ProductsModule {}
