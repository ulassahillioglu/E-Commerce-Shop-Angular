import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product';
declare let alertify: any;
import { AlertifyService } from '../services/alertify.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category/category';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [AlertifyService, ProductService],
})
export class ProductComponent implements OnInit {
  constructor(
    private alertifyService: AlertifyService,
    private cartService: CartService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  title = 'Product List';
  filterText = '';
  products: Product[];

  @Input()
  selectedProduct: Product;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.productService
        .getProducts(params['categoryId'])
        .subscribe((data) => {
          this.products = data;
        });
    });
    
  }

  // viewDetails(product:Product){
  //   this.activatedRoute.params.subscribe(params=>{
  //     this.productService.getProductById(params["id"]).subscribe(data=>{
  //       this.selectedProduct = data;
  //     });
  //   }); // Add a comma here
  // }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
