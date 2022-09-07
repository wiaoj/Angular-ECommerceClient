import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/components/base.component';
import {
  FileUploadDialogComponent,
  FileUploadDialogState,
} from 'src/app/components/dialogs/file-upload-dialog/file-upload-dialog.component';
import {
  AlertifyMessageType,
  AlertifyService,
} from '../../admin/alertify/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
} from '../../ui/customToastr/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../httpClient/http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private toastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) {}
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      // Is it a file?
      if (file.fileEntry.isFile) {
        const fileEntry = file.fileEntry as FileSystemFileEntry;

        fileEntry.file((_file: File) => {
          fileData.append(_file.name, _file, file.relativePath);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = file.fileEntry as FileSystemDirectoryEntry;
        console.log(file.relativePath, fileEntry);
      }
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.LineSpinFade);
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (data) => {
              this.spinner.hide(SpinnerType.LineSpinFade);
              const message = 'Dosyalar başarıyla yüklenmiştir';
              if (this.options.isAdminPage) {
                this.alertifyService.message(message, {
                  dismissOthers: true,
                  messageType: AlertifyMessageType.Success,
                });
              } else {
                this.toastrService.message(message, 'İşlem başarılı', {
                  messageType: ToastrMessageType.Success,
                });
              }
            },
            (errorResponse: HttpErrorResponse) => {
              this.spinner.hide(SpinnerType.LineSpinFade);
              const message =
                'Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşıldı';
              if (this.options.isAdminPage) {
                this.alertifyService.message(message, {
                  dismissOthers: true,
                  messageType: AlertifyMessageType.Error,
                });
              } else {
                this.toastrService.message(message, 'İşlem başarısız', {
                  messageType: ToastrMessageType.Error,
                });
              }
            }
          );
      },
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string; //html içindeki dosya açıklama kısmı
  accept?: string;
  isAdminPage?: boolean = false;
}
