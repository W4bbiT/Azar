import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { GetAllCartComponent } from './components/get-all-cart/get-all-cart.component';
import { GetAllOrderComponent } from './components/get-all-order/get-all-order.component';
import { GetAllProductComponent } from './components/get-all-product/get-all-product.component';
import { GetAllUserComponent } from './components/get-all-user/get-all-user.component';
import { GetOneCartComponent } from './components/get-one-cart/get-one-cart.component';
import { GetOneOrderComponent } from './components/get-one-order/get-one-order.component';
import { GetOneProductComponent } from './components/get-one-product/get-one-product.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';

const routes: Routes = [
  //homepage
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  //users
  { path: 'signin', component: LoginComponent, canActivate:[LoggedInAuthGuard]},
  { path: 'signup', component: CreateUserComponent, canActivate:[LoggedInAuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'edit', component: EditUserComponent, canActivate:[AuthGuard] },
  
  //paths for Admin
  { path: 'users', component: GetAllUserComponent, canActivate:[AdminAuthGuard] },
  { path: 'products/:pid', component: GetOneProductComponent, canActivate:[AdminAuthGuard] },
  { path: 'products', component: GetAllProductComponent, canActivate:[AdminAuthGuard]},
  { path: 'products/:pid', component: GetOneProductComponent, canActivate:[AdminAuthGuard]},
  { path: 'products/:pid/edit', component: EditProductComponent, canActivate:[AdminAuthGuard] },
  { path: 'addproduct', component: CreateProductComponent, canActivate:[AdminAuthGuard] },
  //orders
  { path: 'orders', component: GetAllOrderComponent, canActivate:[AuthGuard] },
  { path: 'orders/:oid', component: GetOneOrderComponent, canActivate:[AuthGuard] },
  //carts
  { path: 'carts', component: GetAllCartComponent, canActivate:[AuthGuard] },
  { path: 'carts/:cid', component: GetOneCartComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
