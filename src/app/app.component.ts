import { ViewChild, Component } from "@angular/core";
import { Router } from "@angular/router";
import { DynamicComponentDirective } from "./directives/common/dynamic-component.directive";
import { AuthService } from "./services/common/auth.service";
import { ComponentType, DynamicLoadComponentService } from "./services/common/dynamic-load-component.service";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "./services/ui/customToastr/custom-toastr.service";

declare var $: any;

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "ECommerceClient";
	// HTML sayfasında erişmek için public yapıyoruz

	@ViewChild(DynamicComponentDirective, { static: true })
	dynamicLoadComponentDirective: DynamicComponentDirective;
	constructor(
		public authService: AuthService,
		private toastrService: CustomToastrService,
		private router: Router,
		private dynamicLoadComponentService: DynamicLoadComponentService
	) {
		authService.identityCheck();
	}

	signOut() {
		localStorage.removeItem("accessToken");
		this.authService.identityCheck();

		this.router.navigate([""]); // çıkış yapılınca anasayfaya yönlendiriyoruz

		this.toastrService.message("Oturum kapatıldı", "Çıkış yapıldı", {
			messageType: ToastrMessageType.Warning,
			position: ToastrPosition.TopLeft,
		});
	}

	async loadComponent() {
		await this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
	}
}
