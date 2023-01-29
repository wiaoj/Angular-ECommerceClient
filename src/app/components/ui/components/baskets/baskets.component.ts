import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import Delete_Basket_Item from "src/app/contracts/basket/delete_basket_item";
import { List_Basket_Item } from "src/app/contracts/basket/list_basket_item";
import Update_Basket_Item from "src/app/contracts/basket/update_basket_item";
import { BasketService } from "src/app/services/common/models/basket.service";

declare var $: any;

@Component({
	selector: "app-baskets",
	templateUrl: "./baskets.component.html",
	styleUrls: ["./baskets.component.scss"],
})
export class BasketsComponent extends BaseComponent implements OnInit {
	basketItems: List_Basket_Item[];

	constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
		super(spinner);
	}

	async ngOnInit(): Promise<void> {
		this.showSpinner(SpinnerType.SquareJellyBox);

		this.basketItems = await this.basketService.get();

		this.hideSpinner(SpinnerType.SquareJellyBox);
	}

	async changeQuantity(object: any) {
		this.showSpinner(SpinnerType.SquareJellyBox);

		const basketItemId: string = object.target.attributes["id"].value;
		const quantity: number = object.target.value;

		quantity < 1 && this.removeBasketItem(basketItemId);

		const basketItem: Update_Basket_Item = new Update_Basket_Item();
		basketItem.basketItemId = basketItemId;
		basketItem.quantity = quantity;
		await this.basketService.updateQuantity(basketItem);
		this.hideSpinner(SpinnerType.SquareJellyBox);
	}

	async removeBasketItem(basketItemId: string) {
		this.showSpinner(SpinnerType.SquareJellyBox);

		let basketItem: Delete_Basket_Item = new Delete_Basket_Item();
		basketItem.basketItemId = basketItemId;
		await this.basketService.remove(basketItem);

		$(`.${basketItemId}`).fadeOut(500, () => this.hideSpinner(SpinnerType.SquareJellyBox))
		//this.hideSpinner(SpinnerType.SquareJellyBox);
	}
}
