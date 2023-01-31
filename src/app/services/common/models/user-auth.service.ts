import { SocialUser } from "@abacritt/angularx-social-login";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { TokenResponse } from "src/app/contracts/token/TokenResponse";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "../../ui/customToastr/custom-toastr.service";
import { HttpClientService } from "../httpClient/http-client.service";

@Injectable({
	providedIn: "root",
})
export class UserAuthService {
	constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) {}

	async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
		const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>(
			{
				controller: "auths",
				action: "login",
			},
			{
				usernameOrEmail,
				password,
			}
		);

		const tokenResponse: TokenResponse = (await firstValueFrom(observable)) as TokenResponse;
		if (tokenResponse) {
			localStorage.setItem("accessToken", tokenResponse.token.accessToken);

			localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

			this.toastrService.message("Success", "Success", {
				messageType: ToastrMessageType.Success,
				position: ToastrPosition.TopFullWidth,
			});
		}
		callBackFunction();
	}

	async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void): Promise<any> {
		const observable: Observable<any | TokenResponse> = this.httpClientService.post(
			{
				controller: "auths",
				action: "refreshtokenlogin",
			},
			{ refreshToken: refreshToken }
		);

		const tokenResponse: TokenResponse = (await firstValueFrom(observable)) as TokenResponse;

		if (tokenResponse) {
			localStorage.setItem("accessToken", tokenResponse.token.accessToken);

			localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
		}
		callBackFunction();
	}

	async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
		const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>(
			{
				controller: "auths",
				action: "google-login",
			},
			user
		);

		const tokenResponse: TokenResponse = (await firstValueFrom(observable)) as TokenResponse;

		if (tokenResponse) {
			localStorage.setItem("accessToken", tokenResponse.token.accessToken);

			localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

			this.toastrService.message("Logined with Google", "Success", {
				messageType: ToastrMessageType.Success,
				position: ToastrPosition.TopFullWidth,
			});
		}

		callBackFunction();
	}

	async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
		const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>(
			{
				controller: "auths",
				action: "facebook-login",
			},
			user
		);

		const tokenResponse: TokenResponse = (await firstValueFrom(observable)) as TokenResponse;

		if (tokenResponse) {
			localStorage.setItem("accessToken", tokenResponse.token.accessToken);

			localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

			this.toastrService.message("Logined with Facebook", "Success", {
				messageType: ToastrMessageType.Success,
				position: ToastrPosition.TopFullWidth,
			});
		}
		callBackFunction();
	}

	async passwordReset(email: string, callBackFunction?: () => void) {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "auths",
				action: "password-reset",
			},
			{ email: email }
		);

		await firstValueFrom(observable);
		callBackFunction();
	}

	async verifyResetToken(userId: string, resetToken: string, callBackFunction?: () => void): Promise<any> {
		const observable: Observable<any> = this.httpClientService.post(
			{
				controller: "auths",
				action: "verify-reset-token",
			},
			{ userId: userId, resetToken: resetToken }
		);

		const data = await firstValueFrom(observable);
		callBackFunction();

		return data;
	}
}
