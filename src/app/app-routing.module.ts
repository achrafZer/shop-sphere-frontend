import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'me', component: BuyerComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: OrderComponent },
  { path: 'products/:id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
