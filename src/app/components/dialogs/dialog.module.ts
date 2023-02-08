import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { SelectProductImageDialogComponent } from "./select-product-image-dialog/select-product-image-dialog.component";
import { FileUploadModule } from "src/app/services/common/file-upload/file-upload.module";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { BasketItemRemoveDialogComponent } from "./basket-item-remove-dialog/basket-item-remove-dialog.component";
import { ShoppingComplateDialogComponent } from "./shopping-complate-dialog/shopping-complate-dialog.component";
import { OrderDetailDialogComponent } from "./order-detail-dialog/order-detail-dialog.component";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { OrderCompleteDialogComponent } from "./order-complete-dialog/order-complete-dialog.component";
import { AuthorizeMenuDialogComponent } from "./authorize-menu-dialog/authorize-menu-dialog.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatListModule } from "@angular/material/list";
import { AuthorizeUserDialogComponent } from "./authorize-user-dialog/authorize-user-dialog.component";
import { QrcodeDialogComponent } from "./qrcode-dialog/qrcode-dialog.component";
import { QrcodeReadingDialogComponent } from "./qrcode-reading-dialog/qrcode-reading-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxScannerQrcodeModule } from "ngx-scanner-qrcode";

@NgModule({
	declarations: [
		DeleteDialogComponent,
		SelectProductImageDialogComponent,
		BasketItemRemoveDialogComponent,
		ShoppingComplateDialogComponent,
		OrderDetailDialogComponent,
		OrderCompleteDialogComponent,
		AuthorizeMenuDialogComponent,
		AuthorizeUserDialogComponent,
		QrcodeDialogComponent,
		QrcodeReadingDialogComponent,
	],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		FileUploadModule,
		MatTableModule,
		MatToolbarModule,
		MatBadgeModule,
		MatListModule,
		MatFormFieldModule,
		MatInputModule,
		NgxScannerQrcodeModule,
	],
})
export class DialogModule {}
