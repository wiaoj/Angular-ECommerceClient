import { Inject, Injectable } from "@angular/core";
import { HubConnection } from "@microsoft/signalr";
import { HubConnectionState } from "@microsoft/signalr/dist/esm/HubConnection";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";

@Injectable({
	providedIn: "root",
})
export class SignalRService {
	private _connection: HubConnection;


constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string) {
}


	get connection(): HubConnection {
		return this._connection;
	}

	start(hubUrl: string) {
		hubUrl = `${this.baseSignalRUrl}${hubUrl}`
		if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
			const builder: HubConnectionBuilder = new HubConnectionBuilder();

			const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

			hubConnection
				.start()
				.then(() => {
					console.log("Connected the SignalR");
				})
				.catch((error) =>
					setTimeout(() => {
						this.start(hubUrl);
					}, 2000)
				);
			this._connection = hubConnection;
		}

		this._connection.onreconnected((connectionId) => console.log("Reconnected"));
		this._connection.onreconnecting((error) => console.log("Reconnecting"));
		this._connection.onclose((error) => console.log("Close reconnection"));
	}

	invoke(procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
		this.connection.invoke(procedureName, message).then(successCallBack).catch(errorCallBack);
	}

	on(procedureName: string, callBack: (...message: any) => void) {
		this.connection.on(procedureName, callBack);
	}
}
