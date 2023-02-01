import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { HttpClientService } from "../httpClient/http-client.service";

@Injectable({
	providedIn: "root",
})
export class RoleService {
	constructor(private httpClientService: HttpClientService) {}

	async getRoles(page: number, size: number, succeessCallBack?: () => void, errorCallBack?: (error) => void) {
		const observable: Observable<any> = this.httpClientService.get({
			controller: "roles",
			queryString: `page=${page}&size=${size}`,
		});

		const promiseData = firstValueFrom(observable);
		promiseData.then(succeessCallBack).catch(errorCallBack);

		return await promiseData;
	}

	async create(name: string, succeessCallBack?: () => void, errorCallBack?: (error) => void) {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "roles",
			},
			{ name: name }
		);

		const promiseData = firstValueFrom(observable);
		promiseData.then(succeessCallBack).catch(errorCallBack);
		return (await promiseData) as { succeeded: boolean };
	}
}
