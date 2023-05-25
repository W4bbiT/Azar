import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

import { HttpRequestInterceptor } from './helper/auth.interceptor';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { ProductsService } from './services/products.service';

import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { ProfileMenuComponent } from './components/menus/profile-menu/profile-menu.component';
import { LoginMenuComponent } from './components/menus/login-menu/login-menu.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CartMenuComponent } from './components/menus/cart-menu/cart-menu.component';

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
    HomePageComponent,
    LoginComponent,
    ProfileComponent,
    ProfileMenuComponent,
    LoginMenuComponent,
    ClickOutsideDirective,
    CartMenuComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi:true
  },
  UsersService,
  ProductsService,
  AuthGuard,LoggedInAuthGuard,AdminAuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
