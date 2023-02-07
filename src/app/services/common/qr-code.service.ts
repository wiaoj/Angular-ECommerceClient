import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { HttpClientService } from "./httpClient/http-client.service";

@Injectable({
	providedIn: "root",
})
export class QrCodeService {
	constructor(private httpClientService: HttpClientService) {}

	async generateQRCode(productId: string) {
		//file geriye döndüğü için blob olarak yakalıyoruz
		const observable: Observable<Blob> = await this.httpClientService.get(
			{
				controller: "products",
				action: "qrcode",
				responseType: "blob",
			},
			productId
		);

		return await firstValueFrom(observable);
	}
}
