import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './product';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl ='api/products/products.json'; 
    products: IProduct[] =[];
    product: IProduct;
    constructor(private http: HttpClient){}
    getProducts () : Observable <IProduct[]> {
      return this.http.get<IProduct []>(this.productUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    }
    getOneProduct (id: number) : Observable <IProduct[]> {
      console.log ('entered getOneProduct');
      return this.http.get<IProduct []>(this.productUrl).pipe(
        tap((data => ( data.filter (product => product.productId === id)))),
        // tap(data => console.log("data is:" + JSON.stringify(data))),
        catchError(this.handleError)
      ); */
    }
    private handleError (err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = 'An error occurred: ${err.error.message}';
      } else {
        errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message}';
      }
      console.error(errorMessage);
      
      return throwError(errorMessage);
    }
}