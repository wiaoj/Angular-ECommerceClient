import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/components/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/httpClient/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }
  products: Product[] | undefined;
  ngOnInit(): void {
    this.showSpinner(SpinnerType.LineSpinFade);
    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => this.products = data);

    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name:"Kalem",stock: 120,price:20
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller:"products"
    // },"a4d8b2dd-20b7-451e-8ddf-793243ad06be").subscribe();
    
    // this.httpClientService.get({
    //   fullEndPoint : "https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data => console.table(data))
  }
}
