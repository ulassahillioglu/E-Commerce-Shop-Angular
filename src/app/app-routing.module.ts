import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductAddForms1Component } from './product/product-add-forms1/product-add-forms1.component';
import { ProductAddForms2Component } from './product/product-add-forms2/product-add-forms2.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { CarouselComponent } from './carousel/carousel.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SignupComponent } from './signup/signup.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'products/details/:id', component: DetailsComponent },
  { path: 'carousel', component: CarouselComponent },
  {
    path: 'product-add-1',
    component: ProductAddForms1Component,
    canActivate: [LoginGuard],
  },
  {
    path: 'product-add-2',
    component: ProductAddForms2Component,
    canActivate: [LoginGuard],
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products/category/:categoryId', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [LoginGuard],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'orders', component: OrdersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
