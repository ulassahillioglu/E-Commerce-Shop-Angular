import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { FavProduct } from '../favorites/favProduct';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  products: FavProduct[] = [];
  userId = localStorage.getItem('user_id')
  loading: boolean = true; // Add a loading flag


  constructor(private ordersService:OrdersService){}

  getOrders() {
    
    this.ordersService.getOrdersFromBackend(this.userId).subscribe((data) => {
      this.products = data;
      this.loading = false
    });
  
};

  ngOnInit()  {
    this.getOrders()
  }

}
