import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import Create_Order from "src/app/contracts/order/Create_Order";
import List_Order from "src/app/contracts/order/List_Order";
import { HttpClientService } from "../httpClient/http-client.service";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	constructor(private httpClientService: HttpClientService) {}

	async create(order: Create_Order): Promise<void> {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "orders",
				action: "CreateOrder",
			},
			order
		);

		await firstValueFrom(observable);
	}

	async getAllOrders(
		page: number = 0,
		size: number = 5,
		successCallBack?: () => void,
		errorCallBack?: (message: string) => void
	): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
		const observable: Observable<{ totalOrderCount: number; orders: List_Order[] }> = this.httpClientService.get({
			controller: "orders",
			queryString: `page=${page}&size=${size}`,
		});

		const promiseData = firstValueFrom(observable);
		promiseData.then(() => successCallBack).catch((error) => errorCallBack(error));

		return await promiseData;
	}
}
