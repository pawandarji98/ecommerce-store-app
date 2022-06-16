import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  url = environment.url;
  constructor(private httpClient:HttpClient) { }

  getStoreDetailData(params:any) {
    const endPoint = `${this.url}/store/store-detail-data`;
    return this.httpClient.get<any[]>(endPoint , {params})
      .pipe(
        tap(products => console.log('store products retrieved!' , products)),
        catchError(e => {
          throw new Error(e);
        })
      );
  }

  searchProductsByStore(name , storeId): Observable<any[]> {
    const endPoint = `${this.url}/product/searchProductByStore/${name}/${storeId}`;
    return this.httpClient.get<any[]>(endPoint)
    .pipe(
      tap(products => console.log('products retrived by store' , products)),
      catchError(e => {
        throw new Error(e);
      })
    );
  }


}
