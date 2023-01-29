import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import Create_Basket_Item from "src/app/contracts/basket/create_basket_item";
import Delete_Basket_Item from "src/app/contracts/basket/delete_basket_item";
import { List_Basket_Item } from "src/app/contracts/basket/list_basket_item";
import Update_Basket_Item from "src/app/contracts/basket/update_basket_item";
import { HttpClientService } from "../httpClient/http-client.service";

@Injectable({
	providedIn: "root",
})
export class BasketService {
	constructor(private httpClientService: HttpClientService) {}

	async get(): Promise<List_Basket_Item[]> {
		const observable: Observable<List_Basket_Item[]> = this.httpClientService.get({
			controller: "baskets",
			action: "GetBasketItems",
		});

		return await firstValueFrom(observable);
	}

	async add(basketItem: Create_Basket_Item): Promise<void> {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "baskets",
				action: "AddItemToBasket",
			},
			basketItem
		);

		await firstValueFrom(observable);
	}

	async updateQuantity(basketItem: Update_Basket_Item): Promise<void> {
		const observable: Observable<any> = this.httpClientService.put(
			{
				controller: "baskets",
				action: "UpdateQuantity",
			},
			basketItem
		);

		await firstValueFrom(observable);
	}

	async remove(basketItem: Delete_Basket_Item): Promise<void> {
		const observable: Observable<any> = this.httpClientService.delete(
			{
				controller: "baskets",
				action: "RemoveBasketItem",
			},
			basketItem.basketItemId
		);

		await firstValueFrom(observable);
	}
}
