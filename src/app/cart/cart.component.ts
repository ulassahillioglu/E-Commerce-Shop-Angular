import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  deliveryCost: number = 0;

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  
  

  decrementQuantity(item: Product) {
    this.cartService.decrementQuantity(item);
  }

  incrementQuantity(item: Product) {
    this.cartService.incrementQuantity(item);
  }
  onDeliveryOptionChange(event: any) {
    this.deliveryCost = parseFloat(event.target.value);
    this.calculateTotalPrice();
  }

  getPrice(product: Product){
    return this.cartService._currentPrice(product);
  }
  removeItem(item: Product) {
    this.cartService.removeFromCart(item);
    this.products = this.cartService.getCart();
  }

  removeAll() {
    if (
      window.confirm('Are you sure you want to remove all items from the cart?')
    ) {
      this.cartService.removeAllFromCart();
      this.products = this.cartService.getCart();
    }
  }

  calculateTotalPrice() {
    let total = 0;
    this.products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total + this.deliveryCost;
  }

  products = this.cartService.getCart();

  isLoggedIn() {
    return this.accountService.isLoggedIn();
  }

  logOut() {
    this.accountService.logOut();
    this.router.navigate(['login']);
  }
}
