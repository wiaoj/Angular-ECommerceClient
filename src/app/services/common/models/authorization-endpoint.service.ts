import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { HttpClientService } from "../httpClient/http-client.service";

@Injectable({
	providedIn: "root",
})
export class AuthorizationEndpointService {
	constructor(private httpClientService: HttpClientService) {}

	async assignRoleEndpoint(
		menuName: string,
		roles: string[],
		code: string,
		successCallBack?: () => void,
		errorCallBack?: (error) => void
	) {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "AuthorizationEndpoints",
			},
			{
				menuName: menuName,
				roles: roles,
				code: code,
			}
		);

		const promiseData = observable.subscribe({
			next: successCallBack,
			error: errorCallBack,
		});

		await promiseData;
	}

	async getRolesToEndpoint(code: string, menuName: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "AuthorizationEndpoints",
				action: "get-roles-to-endpoint"
			},
			{
				code: code,
				menuName: menuName,
			}
		);

		const promiseData = firstValueFrom(observable);
		promiseData.then(successCallBack).catch(errorCallBack);

		return await promiseData;
	}
}
