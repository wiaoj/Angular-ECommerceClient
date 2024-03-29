import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import Menu from "src/app/contracts/application-configurations/menu";
import { HttpClientService } from "../httpClient/http-client.service";

@Injectable({
	providedIn: "root",
})
export class ApplicationService {
	constructor(private httpClientService: HttpClientService) {}

	async getAuthorizeDefinitionEndpoints(): Promise<Menu[]> {
		const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
			controller: "applicationServices",
		});

		return await firstValueFrom(observable);
	}
}
