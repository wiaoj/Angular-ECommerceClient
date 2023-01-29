import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import Create_Order from "src/app/contracts/order/Create_Order";
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
}
