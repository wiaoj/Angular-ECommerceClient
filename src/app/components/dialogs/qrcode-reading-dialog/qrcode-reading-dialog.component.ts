import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxScannerQrcodeComponent } from "ngx-scanner-qrcode/lib/ngx-scanner-qrcode.component";
import { NgxSpinnerService } from "ngx-spinner";
import { ProductService } from "src/app/services/common/models/product.service";
import { QrCodeService } from "src/app/services/common/qr-code.service";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "src/app/services/ui/customToastr/custom-toastr.service";
import { SpinnerType } from "../../base.component";
import { BaseDialog } from "../base/base-dialog";

declare const $: any;

@Component({
	selector: "app-qrcode-reading-dialog",
	templateUrl: "./qrcode-reading-dialog.component.html",
	styleUrls: ["./qrcode-reading-dialog.component.scss"],
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit, OnDestroy {
	constructor(
		dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string,
		private spinner: NgxSpinnerService,
		private qrCodeService: QrCodeService,
		private toastr: CustomToastrService,
		private productService: ProductService
	) {
		super(dialogRef);
	}

	@ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;
	@ViewChild("stock", { static: true }) stock: ElementRef;

	ngOnInit(): void {
		this.scanner.start();
	}

	ngOnDestroy(): void {
		this.scanner.stop();
	}

	onEvent(event: any) {
		this.spinner.show(SpinnerType.LineSpinFade);
		const data: any = (event as { data: string }).data;
		if (data != null && data != "") {
			const jsonData = JSON.parse(data);
			const stockValue = (this.stock.nativeElement as HTMLInputElement).value;

			this.productService.updateStockQrCodeToProduct(jsonData.id, Number.parseInt(stockValue), () => {
				$("#close-button").click();
				this.toastr.message(`${jsonData.Name} ürünün stok bilgisi ${stockValue} güncellenmiştir.`, "Stok Güncellendi", {
					messageType: ToastrMessageType.Success,
					position: ToastrPosition.TopRight,
				});
				this.spinner.hide(SpinnerType.LineSpinFade);
			});
		}
	}
}
