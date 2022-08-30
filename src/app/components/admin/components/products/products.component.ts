import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/components/base.component';
import { Create_Product } from 'src/app/contracts/product/Create_Product';
import { ListProductsComponent } from './list-products/list-products.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {}

  @ViewChild(ListProductsComponent) listComponents : ListProductsComponent; //içindeki child componenti elde ediyoruz
  createdProduct(createdProduct:Create_Product) {
    this.listComponents.getProducts();
  }
}
