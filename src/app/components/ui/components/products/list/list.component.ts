import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from "src/app/components/base.component";
import { BaseUrl } from "src/app/contracts/baseUrl";
import Create_Basket_Item from "src/app/contracts/basket/create_basket_item";
import { List_Product } from "src/app/contracts/product/List_Product";
import { BasketService } from "src/app/services/common/models/basket.service";
import { FileService } from "src/app/services/common/models/file.service";
import { ProductService } from "src/app/services/common/models/product.service";
import { CustomToastrService } from "src/app/services/ui/customToastr/custom-toastr.service";

@Component({
	selector: "app-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.scss"],
})
export class ListComponent extends BaseComponent implements OnInit {
	products: List_Product[];
	currentPageNo: number;
	totalProductCount: number;
	totalPageCount: number;
	pageSize: number = 12;
	pageList: number[] = [];
	baseUrl: BaseUrl;
	constructor(
		spinner: NgxSpinnerService,
		private productService: ProductService,
		private activatedRoute: ActivatedRoute,
		private fileService: FileService,
		private basketService: BasketService,
		private toastrService: CustomToastrService,
		private router: Router
	) {
		super(spinner);
	}

	async ngOnInit(): Promise<void> {
		this.baseUrl = await this.fileService.getStorageBaseUrl();

		this.activatedRoute.params.subscribe(async (params) => {
			this.currentPageNo = parseInt(params["pageNo"] ?? 1);

			if (this.currentPageNo < 1) {
				this.currentPageNo = 1;
				this.router.navigate([`/products/1`]);
			}

			const data: { totalProductCount: number; products: List_Product[] } = await this.productService.read(
				this.currentPageNo - 1,
				this.pageSize,
				() => {},
				(errorMessage) => {}
			);

			this.totalProductCount = data.totalProductCount;
			this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize); //1201 / 12 = 101 olsun istiyoruz.

			this.currentPageNo > this.totalPageCount && this.router.navigate([`/products/${this.totalPageCount}`]);

			this.pageList = [];

			if (this.currentPageNo - 3 <= 0) {
				for (let index = 1; index <= (this.totalPageCount < 7 ? this.totalPageCount : 7); ++index) {
					this.pageList.push(index);
				}
			} else if (this.currentPageNo + 3 >= this.totalPageCount) {
				for (let index = this.totalPageCount - 6; index <= this.totalPageCount; ++index) {
					this.pageList.push(index);
				}
			} else {
				for (let index = this.currentPageNo - 3; index <= this.currentPageNo + 3; ++index) {
					this.pageList.push(index);
				}
			}

			this.products = data.products;

			this.products = this.products.map<List_Product>((product) => {
				const listProduct: List_Product = {
					id: product.id,
					name: product.name,
					price: product.price,
					stock: product.stock,
					createdDate: product.createdDate,
					updatedDate: product.updatedDate,
					productImageFiles: product.productImageFiles,
					showcaseImagePath: `${
						product.productImageFiles.length
							? this.baseUrl.url + product.productImageFiles.find((x) => x.showcase).path
							: ""
					}`,
				};

				return listProduct;
			});
		});
	}

	async addToBasket(product: List_Product) {
		this.showSpinner(SpinnerType.SquareJellyBox);
		let _basketItem: Create_Basket_Item = new Create_Basket_Item();
		_basketItem.productId = product.id;
		_basketItem.quantity = 1;
		await this.basketService.add(_basketItem);
		this.hideSpinner(SpinnerType.SquareJellyBox);
		this.toastrService.message("Ürün sepete eklendi", "Sepete Eklendi");
	}
}
