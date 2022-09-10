import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';
import { BaseDialog } from 'src/app/components/dialogs/base/base-dialog';
import { AlertifyMessageType, AlertifyService } from '../admin/alertify/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog,private alertify:AlertifyService) {}

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height:dialogParameters.options?.height,
      position: dialogParameters.options?.position,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === dialogParameters.data) {
        dialogParameters.afterClosed();
      }else {
        if (dialogParameters.isAdminPage) {
          this.alertify.message('Silme işlemi iptal edildi!', {
            dismissOthers: true,
            messageType: AlertifyMessageType.Warning,
          });
        }
      }
    });
  }
}

export class DialogParameters {
  componentType: ComponentType<BaseDialog<any>>;
  data: any;
  afterClosed: () => void;
  isAdminPage: boolean = false;
  options?: Partial<DialogOptions>;
}

export class DialogOptions {
  width?: string = "250px";
  height?: string;
  position?: DialogPosition;
}