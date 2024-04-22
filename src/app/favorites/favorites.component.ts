import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FavProduct } from './favProduct';
import { DetailsService } from '../services/details.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'] // Fixing the styleUrl typo
})
export class FavoritesComponent implements OnInit {
  userId = localStorage.getItem('user_id')
  products: FavProduct[] = []; // Initializing products array
  dateAdded = new Date(); // Initializing dateAdded
  loading: boolean = true; // Add a loading flag

  

  constructor(
    private favoritesService: FavoriteService,
    private router: Router,
    private accountService: AccountService,
    private detailsService:DetailsService,
  ) {
    
    

  }

  

  removeItem(item: FavProduct) {
    this.favoritesService.deleteFromFavs(item).subscribe(
      () => {
        // Remove the item from the frontend array
        this.products = this.products.filter(product => product.id !== item.id);
        
      },
      (error: any) => { // Explicitly specify the type of 'error'
        // Handle error if deletion fails
        console.error('Error removing item from favorites:', error);
        
      }
    );
  }


  removeAll() {
    if (window.confirm('Are you sure you want to remove all items from the list?')) {
      this.favoritesService.removeAllFromFavs();
      
    }
  }

  isLoggedIn() {
    return this.accountService.isLoggedIn();
  }
  
  fetchFavorites() {
    
    this.favoritesService.getFavs(this.userId).subscribe((data) => {
      this.products = data;
      this.loading = false
    });
};
    
  

// fetchUserId() {
//   this.detailsService.getUserId().subscribe(
//     (userId: any) => {
//       this.userId = userId;
//       console.log("User id:", userId);
//       this.loading = false
//       this.fetchFavorites(); // Call fetchFavorites once userId is available
//     },
//     (error: Error) => {
//       // Handle error if necessary
//       console.error('Error fetching user ID:', error);
//     }
//   );
//   return this.userId;
// }

  ngOnInit() {
    // Fetch favorites when the component initializes
      // this.fetchUserId()
    this.fetchFavorites()
    
  }

  
  
  
  
}
