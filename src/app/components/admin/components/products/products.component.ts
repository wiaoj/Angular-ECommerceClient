import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import { QrcodeReadingDialogComponent } from "src/app/components/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component";
import { Create_Product } from "src/app/contracts/product/Create_Product";
import { DialogService } from "src/app/services/common/dialog.service";
import { ListProductsComponent } from "./list-products/list-products.component";
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent extends BaseComponent implements OnInit {
	constructor(spinner: NgxSpinnerService, private dialogService: DialogService) {
		super(spinner);
	}
	ngOnInit(): void {}

	@ViewChild(ListProductsComponent) listComponents: ListProductsComponent; //içindeki child componenti elde ediyoruz
	createdProduct(createdProduct: Create_Product) {
		this.listComponents.getProducts();
	}

	showProductQrCodeReading() {
		this.dialogService.openDialog({
			componentType: QrcodeReadingDialogComponent,
			data: null,
			options: {
				width: "1400px",
			},
			afterClosed: () => {},
		});
	}
}
