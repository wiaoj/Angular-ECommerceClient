import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { Create_User } from "src/app/contracts/user/Create_User";
import List_User from "src/app/contracts/user/List_User";
import { User } from "src/app/entities/user";
import { HttpClientService } from "../httpClient/http-client.service";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private httpClientService: HttpClientService) {}

	async create(user: User): Promise<Create_User> {
		const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>(
			{
				controller: "users",
			},
			user
		);
		return (await firstValueFrom(observable)) as Create_User;
	}

	async getAllUsers(
		page: number = 0,
		size: number = 5,
		successCallBack?: () => void,
		errorCallBack?: (message: string) => void
	): Promise<{ totalUserCount: number; users: List_User[] }> {
		const observable: Observable<{ totalUserCount: number; users: List_User[] }> = this.httpClientService.get({
			controller: "users",
			queryString: `page=${page}&size=${size}`,
		});

		const promiseData = firstValueFrom(observable);
		promiseData.then(() => successCallBack).catch((error) => errorCallBack(error));

		return await promiseData;
	}

	async updatePassword(
		userId: string,
		resetToken: string,
		password: string,
		passwordConfirm: string,
		successCallback?: () => void,
		errorCallback?: (error) => void
	) {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "users",
				action: "update-password",
			},
			{
				userId: userId,
				resetToken: resetToken,
				password: password,
				passwordConfirm: passwordConfirm,
			}
		);

		const promiseData = firstValueFrom(observable);

		promiseData.then(() => successCallback).catch((error) => errorCallback(error));

		await promiseData;
	}

	async assignRoleToUser(id: string, roles: string[], successCallBack?: () => void, errorCallBack?: (error) => void) {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "users",
				action: "assign-role-to-user",
			},
			{
				id: id,
				roles: roles,
			}
		);

		const promiseData = observable.subscribe({
			next: successCallBack,
			error: errorCallBack,
		});

		await promiseData;
	}

	async getRolesToUser(id: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
		const observable: Observable<{ roles: string[] }> = this.httpClientService.get(
			{
				controller: "users",
				action: "get-roles-to-user",
			},
			id
		);

		const promiseData = firstValueFrom(observable);
		promiseData.then(successCallBack).catch(errorCallBack);

		return (await promiseData).roles;
	}
}
