import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable()
export class DetailsService {

  token = localStorage.getItem('token')
  constructor(private http:HttpClient) { }
  path = "https://ulassahillioglu.pythonanywhere.com/products";

  getProductById(productId: any): Observable<Product> {
    let newPath = this.path
    
    if (productId) {
      newPath += "/" + productId + "/";
    }
    
    return this.http.get<Product>(newPath).pipe(
      tap(data => console.log(JSON.stringify(data) )),
      catchError(this.handleError)
    );
  }

  getUserId(): Observable<number> {
    let token_path = "https://ulassahillioglu.pythonanywhere.com/test_token/";
    let _token = "Token " + this.token;

    // Creating HttpHeaders object with Authorization header
    let headers = new HttpHeaders().set('Authorization', _token);

    // Making HTTP request with headers and returning the Observable<number>
    return this.http.get<any>(token_path, { headers: headers }).pipe(
        map(data => {
            console.log("User ID is: ",JSON.stringify(data));
            // Extract the user ID from the response data and return it
            return data; // Assuming userId is present in the response
        }),
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
}
