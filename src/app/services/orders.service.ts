import { Injectable } from '@angular/core';
import { FavProduct } from '../favorites/favProduct';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  path = 'https://ulassahillioglu.pythonanywhere.com/orders/'
  
  constructor(private http:HttpClient,
  ) { }


  getOrdersFromBackend(userId: any): Observable<FavProduct[]> {
    let newPath = this.path;

    if (userId) {
      newPath += '?userId=' + userId;
    }
    console.log(newPath);
    return this.http.get<FavProduct[]>(newPath).pipe(
      tap((data) => console.log(JSON.stringify(data))),
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
    return throwError(() => new Error(errorMessage));
  }
}
