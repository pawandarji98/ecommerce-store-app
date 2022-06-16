import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.url;
  constructor(private httpClient:HttpClient) {
  }

  getStoresNearby(address): Observable<any[]> {
    const endPoint = `${this.url}/store/get-stores-location-wise/${address}`;
    return this.httpClient.get<any[]>(endPoint)
      .pipe(
        tap(stores => console.log('stores retrieved!' , stores)),
        catchError(e => {
          throw new Error(e);
        })
      );
  }

  searchStoreByKey(name): Observable<any[]> {
    const endPoint = `${this.url}/store/searchStoreByKey/${name}`;
    return this.httpClient.get<any[]>(endPoint)
      .pipe(
        tap(stores => console.log('stores retrived' , stores)),
        catchError(e => {
          throw new Error(e);
        })
      );
  }

  searchMedicinesByKey(params): Observable<any[]> {
    const endPoint = `${this.url}/product/searchProducts`;
    return this.httpClient.get<any[]>(endPoint , {params})
    .pipe(
      tap(products => console.log('products retrived' , products)),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getAllSubCategoriesByCategory(): Observable<any[]> {
    const endPoint = `${this.url}/product-sub-category/get-all`;
    return this.httpClient.get<any[]>(endPoint)
    .pipe(
      tap(productSubCategory => console.log('products sub category retrived' , productSubCategory)),
      catchError(e => {
        throw new Error(e);
      })
    );
  }
}
