import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { CartComponent } from './components/cart/cart.component';
import { BuyerUpdateFormComponent } from './components/forms/buyer-update-form/buyer-update-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { PaymentFormComponent } from './components/forms/payment-form/payment-form.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BuyerComponent,
    LoginFormComponent,
    OrderComponent,
    OrdersComponent,
    ProductComponent,
    ProductsComponent,
    BuyerUpdateFormComponent,
    PaymentFormComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
