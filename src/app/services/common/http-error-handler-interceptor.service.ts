import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, Observable, of } from "rxjs";
import { SpinnerType } from "src/app/components/base.component";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "../ui/customToastr/custom-toastr.service";
import { UserAuthService } from "./models/user-auth.service";

@Injectable({
	providedIn: "root",
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
	constructor(
		private toastrService: CustomToastrService,
		private userAuthService: UserAuthService,
		private router: Router,
		private spinner: NgxSpinnerService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error) => {
				switch (error.status) {
					case HttpStatusCode.Unauthorized:
						const url = this.router.url;

						if (url === "/products") {
							this.toastrService.message("Sepete ürün eklemek için oturum açmalısınız", "Oturum açınız", {
								messageType: ToastrMessageType.Warning,
								position: ToastrPosition.TopRight
							});
						} else {
							this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır.", "Yetkisiz işlem", {
								messageType: ToastrMessageType.Warning,
								position: ToastrPosition.TopCenter,
							});

							this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then((data) => {});
						}

						break;

					case HttpStatusCode.InternalServerError:
						this.toastrService.message("Sunucuya erişim sağlanamadı.", "Sunucu hatası", {
							messageType: ToastrMessageType.Warning,
							position: ToastrPosition.TopCenter,
						});
						break;

					case HttpStatusCode.BadRequest:
						this.toastrService.message("Geçersiz işlem yapıldı.", "Geçersiz işlem", {
							messageType: ToastrMessageType.Error,
							position: ToastrPosition.TopCenter,
						});
						break;

					case HttpStatusCode.NotFound:
						this.toastrService.message("Aranılan içerik bulunamadı.", "Sayfa bulunamadı", {
							messageType: ToastrMessageType.Info,
							position: ToastrPosition.TopCenter,
						});
						break;

					default:
						this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir.", "Hata alındı", {
							messageType: ToastrMessageType.Warning,
							position: ToastrPosition.TopCenter,
						});
						break;
				}
				this.spinner.hide(SpinnerType.SquareJellyBox)
				return of(error);
			})
		);
	}
}
