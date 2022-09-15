import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/product/Create_Product';
import { List_Product } from 'src/app/contracts/product/List_Product';
import { List_Product_Image } from 'src/app/contracts/product/List_Product_Image';
import { HttpClientService } from '../httpClient/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: Create_Product,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): void {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          if (successCallBack) successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;

          let message: string = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          if (errorCallBack) errorCallBack(message);
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (message: string) => void
  ): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      totalCount: number;
      products: List_Product[];
    }> = this.httpClientService
      .get<{ totalCount: number; products: List_Product[] }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();

    promiseData
      .then((data) => {
        if (successCallBack) successCallBack();
      })
      .catch((errorResponse: HttpErrorResponse) => {
        if (errorCallBack) errorCallBack(errorResponse.message);
      });

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>(
        {
          controller: 'products',
        },
        id
      );

    await firstValueFrom(deleteObservable);
  }

  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> =
      this.httpClientService.get<List_Product_Image[]>(
        {
          action: 'getproductimages',
          controller: 'products',
        },
        id
      );

    const images = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'Deleteproductimage',
        controller: 'products',
        queryString: `imageId=${imageId}`,
      },
      id
    );
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}
