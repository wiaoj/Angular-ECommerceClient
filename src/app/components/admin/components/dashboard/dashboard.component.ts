import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import { HubUrls } from "src/app/constants/hub-urls";
import { ReceiveFunctions } from "src/app/constants/receive-functions";
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from "src/app/services/admin/alertify/alertify.service";
import { SignalRService } from "src/app/services/common/signalr.service";
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent extends BaseComponent implements OnInit {
	constructor(private alertify: AlertifyService, spinner: NgxSpinnerService, private signalRService: SignalRService) {
		super(spinner);
	}

	ngOnInit(): void {
		this.signalRService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction, (message) => {
			this.alertify.message(message, {
				messageType: AlertifyMessageType.Notify,
				position: AlertifyPosition.TopRight,
			});
		});

		this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, (message) => {
			this.alertify.message(message, {
				messageType: AlertifyMessageType.Warning,
				position: AlertifyPosition.TopCenter,
			});
		});

		this.showSpinner(SpinnerType.LineSpinFade);
	}
}
