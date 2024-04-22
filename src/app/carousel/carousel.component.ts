import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../services/carousel.service';
import { OnSale } from './on-sale';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  providers: [CarouselService]
})
export class CarouselComponent implements OnInit{

  title = 'On Sale Products';
  images : OnSale[];
  constructor(private carouselService:CarouselService) { }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  ngOnInit(){
      this.carouselService.getProducts().subscribe(data=>{
        this.images = data;
      }
    );
  }
}
