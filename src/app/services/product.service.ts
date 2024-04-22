import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ProductService {
  

  constructor(private http: HttpClient) { }
  path = "https://ulassahillioglu.pythonanywhere.com/products/";


  
  getProducts(categoryId: any): Observable<Product[]> {
    let newPath = this.path;
    if (categoryId) {
      newPath += "?categoryId=" + categoryId;
    }
    return this.http.get<Product[]>(newPath).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    }
    return throwError(()=>new Error(errorMessage));
  }

  addProduct(product: Product): Observable<Product> {
    // const httpOptions = {
    //   headers : new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Token',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': 'true',
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  
        
    //   })
    // }
    return this.http.post<Product>(this.path, product).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

}
