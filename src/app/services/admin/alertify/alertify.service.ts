import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(message: String, options: Partial<AlertifyOptions>): void {
    alertify.set('notifier', 'delay', options.delay ? options.delay : 4);
    alertify.set('notifier', 'position', options.position ? options.position : AlertifyPosition.TopRight);
    return options.dismissOthers
      ? alertify[options.messageType!](message).dismissOthers()
      : alertify[options.messageType!](message);
  }

  dismissAll() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: AlertifyMessageType;
  position: AlertifyPosition;
  delay: Number;
  dismissOthers: Boolean;
}

export enum AlertifyMessageType {
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export enum AlertifyPosition {
  TopLeft = 'top-left',
  TopCenter = 'top-center',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
}
