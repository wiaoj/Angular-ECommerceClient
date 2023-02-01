import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import { AlertifyService, AlertifyMessageType } from "src/app/services/admin/alertify/alertify.service";
import { RoleService } from "src/app/services/common/models/role.service";

@Component({
	selector: "app-create-role",
	templateUrl: "./create-role.component.html",
	styleUrls: ["./create-role.component.scss"],
})
export class CreateRoleComponent extends BaseComponent implements OnInit {
	constructor(spinner: NgxSpinnerService, private alertify: AlertifyService, private roleService: RoleService) {
		super(spinner);
	}

	ngOnInit(): void {}

	@Output() createdRole: EventEmitter<string> = new EventEmitter();

	create(name: HTMLInputElement) {
		this.showSpinner(SpinnerType.LineSpinFade);

		//! Validation örneği reactive form geçmeden önce böyle olacak
		if (!name.value) {
			this.alertify.message("Lütfen rol adını giriniz!", {
				messageType: AlertifyMessageType.Error,
			});
			return;
		}

		this.roleService.create(
			name.value,
			() => {
				this.hideSpinner(SpinnerType.LineSpinFade);
				this.alertify.message("Rol başarıyla eklenmiştir.", {
					messageType: AlertifyMessageType.Success,
					dismissOthers: true,
				});
				this.createdRole.emit(name.value);
			},
			(errorMessage: any) => {
				this.alertify.message(errorMessage, {
					messageType: AlertifyMessageType.Error,
					dismissOthers: true,
				});
			}
		);
	}
}
