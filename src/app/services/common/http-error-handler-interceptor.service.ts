import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "../ui/customToastr/custom-toastr.service";
import { UserAuthService } from "./models/user-auth.service";

@Injectable({
	providedIn: "root",
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
	constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error) => {
				switch (error.status) {
					case HttpStatusCode.Unauthorized:
						this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır.", "Yetkisiz işlem", {
							messageType: ToastrMessageType.Warning,
							position: ToastrPosition.TopCenter,
						});

						this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then((data) => {});
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
						this.toastrService.message("Beklenmeyen bir hata meydaha gelmiştir.", "Hata alındı", {
							messageType: ToastrMessageType.Warning,
							position: ToastrPosition.TopCenter,
						});
						break;
				}
				return of(error);
			})
		);
	}
}
