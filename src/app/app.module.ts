import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { ProductAddForms1Component } from './product/product-add-forms1/product-add-forms1.component';
import { ProductAddForms2Component } from './product/product-add-forms2/product-add-forms2.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from './services/account.service';
import { LoginGuard } from './login/login.guard';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselService } from './services/carousel.service';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SignupComponent } from './signup/signup.component';
import { DetailsService } from './services/details.service';
import { FavoriteService } from './services/favorite.service';
import { OrdersComponent } from './orders/orders.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CategoryComponent,
    ProductComponent,
    ProductFilterPipe,
    ProductAddForms1Component,
    ProductAddForms2Component,
    LoginComponent,
    CarouselComponent,
    DetailsComponent,
    CartComponent,
    ScrollToTopComponent,
    FavoritesComponent,
    SignupComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  providers: [
    provideClientHydration(),
    AccountService,
    LoginGuard,
    CarouselService,
    DetailsService,
    FavoriteService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
