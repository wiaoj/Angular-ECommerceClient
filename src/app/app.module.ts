import {
	FacebookLoginProvider,
	GoogleLoginProvider,
	SocialAuthServiceConfig,
	SocialLoginModule,
} from "@abacritt/angularx-social-login";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LOCALE_ID, NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from "./components/ui/components/login/login.component";
import { HttpErrorHandlerInterceptorService } from "./services/common/http-error-handler-interceptor.service";
import { BasketsModule } from "./components/ui/components/baskets/baskets.module";
import { DynamicComponentDirective } from "./directives/common/dynamic-component.directive";
import { OrderCodePipe } from "./pipes/orders/order-code.pipe";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		// Google login yapacağımız için ilgili kütüphane sadece app.module içerisinde çalıştığı için mecburan buraya taşıdık
		// login componenti direkt olarak app module bağladık çünkü ilgili kütüphane app module'da olmalı
		DynamicComponentDirective,
	],
	providers: [
		{
			provide: "baseSignalRUrl",
			useValue: "https://localhost:7158/",
			multi: true,
		},
		{
			provide: "baseUrl",
			useValue: "https://localhost:7158/api",
			multi: true,
		},
		{
			provide: "SocialAuthServiceConfig",
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(
							"544170587397-irgcfffm987ckuguk3b7vrt450oe9b15.apps.googleusercontent.com"
						), // https://console.cloud.google.com/
					},
					{
						id: FacebookLoginProvider.PROVIDER_ID,
						provider: new FacebookLoginProvider("3278540179047559"), // https://developers.facebook.com
					},
				],
				onError: (error) => {
					/*console.log(error)*/
				},
			} as SocialAuthServiceConfig,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorHandlerInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ComponentsModule,
		NgxSpinnerModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: () => localStorage.getItem("accessToken"),
				allowedDomains: ["localhost:7158"], // header ile gönderilecek tokena birilerinin erişmesini engellemek içi bunu kullanıyoruz
				// Interceptor olarak header'a tokenimizi ekliyor - bunları bu kütüphane sayesinde yapıyoruz
			},
		}),
		SocialLoginModule,
		MatIconModule,
	],
})
export class AppModule {}
