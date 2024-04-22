import { Inject, Injectable } from '@angular/core';
import { Product } from '../product/product';
import { AlertifyService } from './alertify.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private alertifyService: AlertifyService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loadCartFromLocalStorage();
  }

  private products: Product[] = [];

  private loadCartFromLocalStorage() {
    const cartItems = this.document.defaultView?.localStorage.getItem('cart');
    if (cartItems) {
      this.products = JSON.parse(cartItems);
    }
  }

  private saveCartToLocalStorage() {
    this.document.defaultView?.localStorage.setItem(
      'cart',
      JSON.stringify(this.products)
    );
  }

  addToCart(product: Product) {
    if (this.products.some((p) => p.id === product.id)) {
      const foundProduct = this.products.find((p) => p.id === product.id);
      if (foundProduct) {
        foundProduct.quantity++;
        this.alertifyService.success(product.name + ' added to cart');
        this.saveCartToLocalStorage();
        return;
      }
    }
    this.alertifyService.success(product.name + ' added to cart');
    this.products.push({ ...product, quantity: 1 });
    this.saveCartToLocalStorage();
    console.log(this.products);
  }

  getCart() {
    return this.products;
  }

  removeFromCart(product: Product) {
    this.products = this.products.filter((p) => p.id !== product.id);
    this.saveCartToLocalStorage();
    this.alertifyService.error(product.name + ' removed from cart');
  }

  incrementQuantity(product: Product) {
    product.quantity++;
    this.saveCartToLocalStorage();
  }

  decrementQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;

      this.saveCartToLocalStorage();
    }
  }

  removeAllFromCart() {
    this.products = [];
    this.saveCartToLocalStorage();
  }

  _currentPrice(product: Product) {
    return product.price * product.quantity;
}

}