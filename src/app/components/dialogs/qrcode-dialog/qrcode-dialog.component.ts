import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer, SafeHtml, SafeUrl } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import Single_Order from "src/app/contracts/order/Single_Order";
import { QrCodeService } from "src/app/services/common/qr-code.service";
import { CustomToastrService } from "src/app/services/ui/customToastr/custom-toastr.service";
import { SpinnerType } from "../../base.component";
import { BaseDialog } from "../base/base-dialog";

@Component({
	selector: "app-qrcode-dialog",
	templateUrl: "./qrcode-dialog.component.html",
	styleUrls: ["./qrcode-dialog.component.scss"],
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {
	constructor(
		dialogRef: MatDialogRef<QrcodeDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string,
		private spinner: NgxSpinnerService,
		private qrCodeService: QrCodeService,
		private domSanitizer: DomSanitizer
	) {
		super(dialogRef);
	}

	qrCodeSafeUrl: SafeUrl;
	async ngOnInit(): Promise<void> {
		this.spinner.show(SpinnerType.LineSpinFade);
		const qrCodeBlob: Blob = await this.qrCodeService.generateQRCode(this.data);

		const url: string = URL.createObjectURL(qrCodeBlob);

		this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
		this.spinner.hide(SpinnerType.LineSpinFade);
	}
}
