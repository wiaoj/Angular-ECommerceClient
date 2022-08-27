import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/components/base.component';
import { Create_Product } from 'src/app/contracts/Create_Product';
import {
  AlertifyMessageType,
  AlertifyPosition,
  AlertifyService,
} from 'src/app/services/admin/alertify/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private productService: ProductService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.LineSpinFade);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.LineSpinFade);
      this.alertify.message('Ürün başarıyla eklenmiştir.', {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.TopRight,
      });
    });
  }
}
