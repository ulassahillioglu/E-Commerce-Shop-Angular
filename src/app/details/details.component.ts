import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product/product';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { DetailsService } from '../services/details.service';
import { CartService } from '../services/cart.service';
import { FavoriteService } from '../services/favorite.service';
import { FavProduct } from '../favorites/favProduct';
import { AccountService } from '../services/account.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [AlertifyService, DetailsService]
})
export class DetailsComponent implements OnInit {
  title = 'Product Details';
  productId: number;
  selectedProduct: Product;
  favProduct: FavProduct = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    date_added: new Date().toISOString().split('T')[0],
    userId: 0,
  };
  loading: boolean = true; // Add a loading flag
  loggedIn = false

  cartService = inject(CartService);
  constructor(private detailsService: DetailsService,
              private activatedRoute: ActivatedRoute,
              private alertifyService: AlertifyService,
              private favoritesService:FavoriteService,
            private accountService:AccountService,
          private router:Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params["id"];
      if (this.productId){
        console.log('Product ID:', this.productId, typeof this.productId);
        this.loadProductDetails();
      }
    });
  }


  isLoggedIn(){
    return this.accountService.isLoggedIn()
  }
  createFavProduct(product:Product){
      this.favProduct.id = product.id
      this.favProduct.name = product.name
      this.favProduct.price = product.price
      this.favProduct.description = product.description
      this.favProduct.imageUrl = product.imageUrl
      this.detailsService.getUserId().subscribe(
        userId => {
            this.favProduct.userId = userId;
        },
        error => {
            // Handle error if necessary
            console.error('Error fetching user ID:', error);
        }
    );
    return this.favProduct;
    
  }
  

  loadProductDetails(){
    this.detailsService.getProductById(this.productId).subscribe(data => {
      this.selectedProduct = data;
      this.createFavProduct(this.selectedProduct)
      console.log("Fav Product:", this.favProduct)
      console.log('Product:', this.selectedProduct);
      this.loading = false; // Update loading flag when data is loaded
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  addToFavs(product: FavProduct){
    if (this.isLoggedIn() == true){
    this.favoritesService.addToFavs(product)
    }
    else{
      this.router.navigate(['/login']);

    }
  }

  
}
