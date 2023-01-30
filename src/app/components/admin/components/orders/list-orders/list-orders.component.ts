import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import {
	OrderDetailDialogComponent,
	OrderDetailDialogState,
} from "src/app/components/dialogs/order-detail-dialog/order-detail-dialog.component";
import { SelectProductImageDialogComponent } from "src/app/components/dialogs/select-product-image-dialog/select-product-image-dialog.component";
import List_Order from "src/app/contracts/order/List_Order";
import { List_Product } from "src/app/contracts/product/List_Product";
import { AlertifyService, AlertifyMessageType, AlertifyPosition } from "src/app/services/admin/alertify/alertify.service";
import { DialogService } from "src/app/services/common/dialog.service";
import { OrderService } from "src/app/services/common/models/order.service";
import { ProductService } from "src/app/services/common/models/product.service";

@Component({
	selector: "app-list-orders",
	templateUrl: "./list-orders.component.html",
	styleUrls: ["./list-orders.component.scss"],
})
export class ListOrdersComponent extends BaseComponent implements OnInit {
	constructor(
		spinner: NgxSpinnerService,
		private orderService: OrderService,
		private alertif: AlertifyService,
		private dialogService: DialogService
	) {
		super(spinner);
	}

	displayedColumns: string[] = ["orderCode", "userName", "totalPrice", "createdDate", "viewDetail", "delete"];

	dataSource: MatTableDataSource<List_Order>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	async ngOnInit() {
		await this.getOrders();
	}

	async getOrders() {
		this.showSpinner(SpinnerType.LineSpinFade);
		const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(
			this.paginator ? this.paginator.pageIndex : 0,
			this.paginator ? this.paginator.pageSize : 5,
			() => this.hideSpinner(SpinnerType.LineSpinFade),
			(errorMessage) =>
				this.alertif.message(errorMessage, {
					dismissOthers: true,
					messageType: AlertifyMessageType.Error,
					position: AlertifyPosition.TopRight,
				})
		);

		this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
		this.paginator.length = allOrders.totalOrderCount;
	}

	async pageChanged() {
		await this.getOrders();
	}

	showDetail(id: string) {
		this.dialogService.openDialog({
			componentType: OrderDetailDialogComponent,
			data: id,
			options: {
				width: "48rem"
			}
		});
	}
}
