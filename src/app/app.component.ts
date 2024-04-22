import { Component, inject } from '@angular/core';
import { AccountService } from './services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { provideClientHydration } from '@angular/platform-browser';
import { FavoriteService } from './services/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shop';
  user = 'notAdmin ';
  cartService = inject(CartService);
  favService = inject(FavoriteService);
  isSuperuser: boolean;
  constructor(private accountService:AccountService,private router:Router,
    ) {
      
        // this.accountService
        //   .checkSuperuser()
        //   .subscribe((data) => {
        //     this.isSuperuser = data.is_superuser;
        //   });
      
  }
  // get Admin(){
  //   return this.isSuperuser;
  // }

  ngOnInit() {
    
    this.accountService.checkSuperuser().subscribe(
      response => {
        this.isSuperuser = response.is_superuser;
      },
      error => {
        console.error('Error checking superuser status:', error);
      }
    );
  }

  // cartCount(){
  //   return this.cartService.getCart().length;
  // }
  
  // isFavorites(){
  //   if(this.isLoggedIn()==false){
  //     return this.router.navigate(['login'])
      
  //   }
  //   return this.router.navigate(['favorites'])
  // }
  isLoggedIn(){
    return this.accountService.isLoggedIn();
  }

  authStatus(){
    return this.accountService.checkAdmin()
  }
  
  logOut(){
    this.accountService.logOut();
    this.router.navigate(['login']);
    this.isSuperuser = false;
  }
  getCart(): any {
    let total = 0
    let products = this.cartService.getCart()
    products.forEach((product) => {
      total += product.quantity
    })
    return total
  }

  
}
