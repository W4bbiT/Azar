import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { GetAllProductComponent } from './components/get-all-product/get-all-product.component';
import { GetOneProductComponent } from './components/get-one-product/get-one-product.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { GetAllUserComponent } from './components/get-all-user/get-all-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { GetOneUserComponent } from './components/get-one-user/get-one-user.component';
import { GetAllOrderComponent } from './components/get-all-order/get-all-order.component';
import { GetOneOrderComponent } from './components/get-one-order/get-one-order.component';
import { GetAllCartComponent } from './components/get-all-cart/get-all-cart.component';
import { GetOneCartComponent } from './components/get-one-cart/get-one-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsService } from './services/products.service';

import { MaterialModule } from 'src/MaterialModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    EditProductComponent,
    GetAllProductComponent,
    GetOneProductComponent,
    CreateUserComponent,
    GetAllUserComponent,
    EditUserComponent,
    GetOneUserComponent,
    GetAllOrderComponent,
    GetOneOrderComponent,
    GetAllCartComponent,
    GetOneCartComponent,
    HomePageComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
