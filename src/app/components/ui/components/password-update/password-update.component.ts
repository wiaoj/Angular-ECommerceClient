import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinner, NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import { UserAuthService } from "src/app/services/common/models/user-auth.service";
import { UserService } from "src/app/services/common/models/user.service";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "src/app/services/ui/customToastr/custom-toastr.service";

@Component({
	selector: "app-password-update",
	templateUrl: "./password-update.component.html",
	styleUrls: ["./password-update.component.scss"],
})
export class PasswordUpdateComponent extends BaseComponent implements OnInit {
	constructor(
		spinner: NgxSpinnerService,
		private userAuthService: UserAuthService,
		private activatedRoute: ActivatedRoute,
		private toastr: CustomToastrService,
		private router: Router,
		private userService: UserService
	) {
		super(spinner);
	}

	data: { state: boolean; email: string };

	ngOnInit(): void {
		this.showSpinner(SpinnerType.SquareJellyBox);
		this.activatedRoute.params.subscribe({
			next: async (params) => {
				const userId: string = params["userId"];
				const resetToken: string = params["resetToken"];
				this.data = await this.userAuthService.verifyResetToken(userId, resetToken, () => {
					new Promise((x) =>
						setTimeout(() => {
							if (this.data.state == false) {
								this.router.navigate(["/"]);
								this.hideSpinner(SpinnerType.SquareJellyBox);
								this.toastr.message(
									"Linkin kullanım süresi dolmuştur",
									"Şifre sıfırlama doğrulaması başarısız",
									{
										messageType: ToastrMessageType.Error,
										position: ToastrPosition.TopCenter,
									}
								);
                return
							}

							this.hideSpinner(SpinnerType.SquareJellyBox);
							this.toastr.message(
								"Şifrenizi yeniden oluşturabilirsiniz",
								"Şifre sıfırlama doğrulaması başarılı",
								{
									messageType: ToastrMessageType.Success,
									position: ToastrPosition.TopCenter,
								}
							);
						}, 1000)
					);
				});
			},
		});
	}

	updatePassword(password: string, passwordConfirm: string) {
		this.showSpinner(SpinnerType.SquareJellyBox);

		if (password !== passwordConfirm) {
			this.hideSpinner(SpinnerType.SquareJellyBox);
			this.toastr.message("Şifreleriniz uyuşmuyor", "Şifre sıfırlama başarısız", {
				messageType: ToastrMessageType.Error,
				position: ToastrPosition.TopRight,
			});
			return;
		}

		this.activatedRoute.params.subscribe({
			next: async (params) => {
				const userId: string = params["userId"];
				const resetToken: string = params["resetToken"];
				await this.userService.updatePassword(
					userId,
					resetToken,
					password,
					passwordConfirm,
					() => {
						this.toastr.message("Şifreniz güncellenmiştir", "Şifre değişimi başarılı", {
							messageType: ToastrMessageType.Success,
							position: ToastrPosition.TopCenter,
						});
						this.router.navigate(["/login"]);
					},
					(error) => {}
				);
				this.hideSpinner(SpinnerType.SquareJellyBox);
			},
		});
	}
}
