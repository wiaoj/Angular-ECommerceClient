import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import {
	BasketItemDeleteState,
	BasketItemRemoveDialogComponent,
} from "src/app/components/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component";
import { ShoppingComplateDialogComponent, ShoppingComplateState } from "src/app/components/dialogs/shopping-complate-dialog/shopping-complate-dialog.component";
import Delete_Basket_Item from "src/app/contracts/basket/delete_basket_item";
import { List_Basket_Item } from "src/app/contracts/basket/list_basket_item";
import Update_Basket_Item from "src/app/contracts/basket/update_basket_item";
import Create_Order from "src/app/contracts/order/Create_Order";
import { DialogService } from "src/app/services/common/dialog.service";
import { BasketService } from "src/app/services/common/models/basket.service";
import { OrderService } from "src/app/services/common/models/order.service";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "src/app/services/ui/customToastr/custom-toastr.service";

declare var $: any;

@Component({
	selector: "app-baskets",
	templateUrl: "./baskets.component.html",
	styleUrls: ["./baskets.component.scss"],
})
export class BasketsComponent extends BaseComponent implements OnInit {
	basketItems: List_Basket_Item[];
	@ViewChild("closeModal") closeModal: ElementRef;

	constructor(
		spinner: NgxSpinnerService,
		private basketService: BasketService,
		private orderService: OrderService,
		private toastrService: CustomToastrService,
		private router: Router,
		private dialogService: DialogService
	) {
		super(spinner);
	}

	async ngOnInit(): Promise<void> {
		this.showSpinner(SpinnerType.SquareJellyBox);

		this.basketItems = await this.basketService.get();

		this.hideSpinner(SpinnerType.SquareJellyBox);
	}

	async changeQuantity(object: any): Promise<void> {
		this.showSpinner(SpinnerType.SquareJellyBox);

		const basketItemId: string = object.target.attributes["id"].value;
		const quantity: number = object.target.value;

		if (quantity < 1) {
			return await this.removeBasketItem(basketItemId);
		}

		const basketItem: Update_Basket_Item = new Update_Basket_Item();
		basketItem.basketItemId = basketItemId;
		basketItem.quantity = quantity;
		await this.basketService.updateQuantity(basketItem);
		this.hideSpinner(SpinnerType.SquareJellyBox);
	}

	async removeBasketItem(basketItemId: string): Promise<void> {
		$("#basketModal").modal("hide");
		this.dialogService.openDialog({
			componentType: BasketItemRemoveDialogComponent,
			data: BasketItemDeleteState.Yes,
			afterClosed: async () => {
				this.showSpinner(SpinnerType.SquareJellyBox);

				let basketItem: Delete_Basket_Item = new Delete_Basket_Item();
				basketItem.basketItemId = basketItemId;
				await this.basketService.remove(basketItem);

				$(`.${basketItemId}`).fadeOut(500, () => this.hideSpinner(SpinnerType.SquareJellyBox));
				//this.hideSpinner(SpinnerType.SquareJellyBox);
				// $("#basketModal").modal("show")
			},
		});
	}

	async shoppingComplete() {
		$("#basketModal").modal("hide");
		this.dialogService.openDialog({
			componentType: ShoppingComplateDialogComponent,
			data: ShoppingComplateState.Yes,
			afterClosed: async () => {
				this.showSpinner(SpinnerType.SquareJellyBox);

				const createOrder: Create_Order = new Create_Order();
				createOrder.address = "adress";
				createOrder.description = "order description";
				await this.orderService.create(createOrder);

				this.toastrService.message("Sipariş alınmıştır!", "Siperiş oluşturuldu", {
					messageType: ToastrMessageType.Info,
					position: ToastrPosition.TopLeft,
				});
				this.closeModal.nativeElement.click();
				this.router.navigate(["/"]);
				this.hideSpinner(SpinnerType.SquareJellyBox);
			},
		});
	}
}
