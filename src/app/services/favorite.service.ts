import { Inject, Injectable, OnInit } from '@angular/core';
import { AlertifyService } from './alertify.service';
import { DOCUMENT } from '@angular/common';
import { Product } from '../product/product';
import { FavProduct } from '../favorites/favProduct';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { DetailsService } from './details.service';
import { error } from 'node:console';
import { response } from 'express';

@Injectable()
export class FavoriteService implements OnInit {
  path = 'https://ulassahillioglu.pythonanywhere.com/fav-products/';

  private products: FavProduct[] = [];
  constructor(
    private alertifyService: AlertifyService,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private detailsService: DetailsService
  ) {}

  ////ADD METHODS
  private addFavoriteProductToBackend(
    product: FavProduct
  ): Observable<FavProduct> {
    // Make a POST request to the backend API to add the favorite product
    return this.http.post<FavProduct>(`${this.path}`, product).pipe(
      tap((_) => console.log('Sent request to backend')),
      catchError((error) => {
        console.error(
          'Error occurred while sending request to backend:',error);
        throw error;
      })
    );
  }
  addToFavs(product: FavProduct) {
    // Check if the product already exists in the frontend
    this.getFavs(product.userId).subscribe(
      (favorites) => {
        // Check if the product already exists in the user's favorites
        console.log(product.userId)
        console.log(favorites)
        if (favorites.some((fav) => fav.name === product.name)) {
          console.log(product.name + ' already in your favorites.');
          this.alertifyService.warning(product.name + ' already in your favorites.');
          return;
        }
    

    // Send product to backend
    this.addFavoriteProductToBackend(product).subscribe(
      (response) => {
        console.log('Product added to backend:', response);
        this.alertifyService.success('Product saved to favorites!');
      },
      (error) => {
        console.error('Error adding product to backend:', error);
      }
    );
  })
}
  //////////////////////////////////////////////////////////////////////////////////////////

  ///Delete methods
  deleteFromFavs(product: FavProduct): Observable<FavProduct> {
    
    return this.deleteFavoriteFromBackend(product).pipe(
      tap((response: FavProduct) => {
        console.log("Product removed from backend:", response);
        this.alertifyService.message("Product removed from backend!");
      }),
      catchError((error) => {
        console.error("Error removing product from backend:", error);
        throw error;
      })
    );
  }
  
  private deleteFavoriteFromBackend(
    product: FavProduct
  ): Observable<FavProduct> {
    let product_id = product.id
    let newPath = this.path

    if(product){
      newPath += "?id=" + product.id
    }
  
    return this.http.delete<FavProduct>(`${newPath}`).pipe(
      tap((_) => console.log('Sent request to backend')),
      catchError((error) => {
        console.error('Error occured while sending request to backend:', error);
        throw error;
      })
    );
  }
  ////////////////////////////////////

  

  getFavs(userId: any): Observable<FavProduct[]> {
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
  ///Remove methods
  removeFromFavs(product: FavProduct): Observable<void> {
    this.products = this.products.filter((p) => p.id !== product.id);
    this.alertifyService.error(product.name + ' removed from favorites');
    return of(null).pipe(map(() => {})); // Return a completed Observable
  }

  removeAllFromFavs() {
    this.products = [];
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

  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////
