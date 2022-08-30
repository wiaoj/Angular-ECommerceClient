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
import { HttpClientService } from 'src/app/services/common/httpClient/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private spinner:NgxSpinnerService,
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private productService: ProductService,
    public dialog: MatDialog,
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
    this.spinner.show(SpinnerType.LineSpinFade);
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(2000, () => {
      this.callback.emit();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
