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
import { GetOneUserComponent } from './components/get-one-user/get-one-user.component';

const routes: Routes = [
  //homepage
  { path: '', redirectTo: 'users/:id/products', pathMatch: 'full' },
  //users
  { path: 'adduser', component: CreateUserComponent },
  { path: 'users', component: GetAllUserComponent },
  { path: 'users/:id', component: GetOneUserComponent },
  { path: 'users/:id/edit', component: EditUserComponent },
  //products
  { path: 'users/:id/products', component: GetAllProductComponent, pathMatch: 'full' },
  { path: 'users/:id/products/:pid', component: GetOneProductComponent },
  { path: 'users/:id/products/:pid/edit', component: EditProductComponent },
  { path: 'users/:id/addproduct', component: CreateProductComponent },
  //orders
  { path: 'users/:id/orders', component: GetAllOrderComponent },
  { path: 'users/:id/orders/:oid', component: GetOneOrderComponent },
  //carts
  { path: 'users/:id/carts', component: GetAllCartComponent },
  { path: 'users/:id/carts/:cid', component: GetOneCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
