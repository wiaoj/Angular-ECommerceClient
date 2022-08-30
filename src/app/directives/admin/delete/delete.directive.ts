import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/components/base.component';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/components/dialogs/delete-dialog/delete-dialog.component';
import {
  AlertifyMessageType,
  AlertifyPosition,
  AlertifyService,
} from 'src/app/services/admin/alertify/alertify.service';
import { HttpClientService } from 'src/app/services/common/httpClient/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private spinner: NgxSpinnerService,
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private productService: ProductService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) {
    const deleteButton = _renderer.createElement('mat-icon');
    _renderer.appendChild(deleteButton, _renderer.createText('delete'));
    _renderer.addClass(deleteButton, 'mat-icon');
    _renderer.addClass(deleteButton, 'material-icons');
    _renderer.addClass(deleteButton, 'mat-warn');
    _renderer.setAttribute(deleteButton, 'style', 'cursor: pointer;');
    _renderer.appendChild(element.nativeElement, deleteButton);
  }

  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click') //kullanılan dom nesnesine verilen olay gerçekleşince işaretlenne metod gerçekleştirilir
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.LineSpinFade);
      const td: HTMLTableCellElement = this.element.nativeElement;
      const x = await this.productService.delete(this.id);
      //TODO: Belki düzeltilecek Promise olarak
      $(td.parentElement).animate(
        {
          opacity: 0,
          left: '+=50',
          height: 'toogle',
        },
        700,
        () => {
          this.callback.emit();
          this.alertify.message('Silme işlemi başarılı!', {
            dismissOthers: true,
            messageType: AlertifyMessageType.Success,
            position: AlertifyPosition.TopRight,
          });
        }
      );
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      //* width: '40%',
      //* height: "30%",
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === DeleteState.Yes) {
        afterClosed();
      } else {
        this.alertify.message('Silme işlemi iptal edildi!', {
          dismissOthers: true,
          messageType: AlertifyMessageType.Warning,
          position: AlertifyPosition.TopRight,
        });
      }
    });
  }
}
