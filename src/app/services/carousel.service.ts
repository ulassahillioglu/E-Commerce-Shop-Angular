import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { OnSale } from '../carousel/on-sale';

@Injectable()
export class CarouselService {

  constructor(private http:HttpClient) { }

  path = "https://ulassahillioglu.pythonanywhere.com/on-sale";

  getProducts(): Observable<OnSale[]> {
    return this.http.get<OnSale[]>(this.path).pipe(
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
}
