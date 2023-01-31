import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import Single_Order from "src/app/contracts/order/Single_Order";
import { DialogService } from "src/app/services/common/dialog.service";
import { OrderService } from "src/app/services/common/models/order.service";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "src/app/services/ui/customToastr/custom-toastr.service";
import { SpinnerType } from "../../base.component";
import { BaseDialog } from "../base/base-dialog";
import { OrderCompleteDialogComponent, OrderCompleteState } from "../order-complete-dialog/order-complete-dialog.component";

@Component({
	selector: "app-order-detail-dialog",
	templateUrl: "./order-detail-dialog.component.html",
	styleUrls: ["./order-detail-dialog.component.scss"],
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {
	constructor(
		dialogRef: MatDialogRef<OrderDetailDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
		private orderService: OrderService,
		private dialogService: DialogService,
		private spinner: NgxSpinnerService,
		private toastr: CustomToastrService
	) {
		super(dialogRef);
	}

	singleOrder: Single_Order;
	totalPrice: number;

	displayedColumns: string[] = ["name", "price", "quantity", "totalPrice"];
	dataSource = [];

	clickedRows = new Set<any>();
	async ngOnInit(): Promise<void> {
		this.singleOrder = await this.orderService.getByIdOrder(this.data as string);
		this.dataSource = this.singleOrder.basketItems;
		this.totalPrice = this.singleOrder.basketItems
			.map((basketItem, index) => basketItem.price * basketItem.quantity)
			.reduce((price, current) => price + current);
	}

	completeOrder() {
		this.dialogService.openDialog({
			componentType: OrderCompleteDialogComponent,
			data: OrderCompleteState.Yes,
			afterClosed: async () => {
				this.spinner.show(SpinnerType.SquareJellyBox);
				await this.orderService.completeOrder(this.singleOrder.id);
				this.spinner.hide(SpinnerType.SquareJellyBox);
				this.toastr.message("Sipariş başarıyla tamamlanmıştır, müşteriye bilgi verilmiştir", "Sipariş tamamlandı", {
					messageType: ToastrMessageType.Success,
					position: ToastrPosition.TopRight,
				});
			},
		});
	}
}

export enum OrderDetailDialogState {
	Close,
	OrderComplete,
}
