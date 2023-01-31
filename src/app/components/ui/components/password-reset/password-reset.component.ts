import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import { UserAuthService } from "src/app/services/common/models/user-auth.service";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "src/app/services/ui/customToastr/custom-toastr.service";

@Component({
	selector: "app-password-reset",
	templateUrl: "./password-reset.component.html",
	styleUrls: ["./password-reset.component.scss"],
})
export class PasswordResetComponent extends BaseComponent implements OnInit {
	constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private toastr: CustomToastrService) {
		super(spinner);
	}

	ngOnInit(): void {}

	passwordReset(email: string) {
		this.showSpinner(SpinnerType.SquareJellyBox);
		this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerType.SquareJellyBox)
      this.toastr.message("Şifre sıfırlama isteğiniz alınmıştır", "Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    });
	}
}
