import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from './helpers/auth-guard.guard';

import {

  HomeComponent,
  HomeDemoThemeComponent,
  DemoLoginComponent,
  CreateProductComponent,
  EditProductComponent,
  UserProfileComponent,
  SalesOrdersComponent,
  SalesOrderComponent,
  ShoppingcartComponent,
  CheckoutComponent,
  AdminProductsComponent,
  AboutComponent,
  DashboardSalesComponent,
  ReportsComponent,
  MessagesComponent

} from "./components/index.pages";
import { OrderconfirmationComponent } from './components/demo-theme/content-demo-theme/orderconfirmation/orderconfirmation.component';
import { CompanyResolver } from './resolvers/company-resolver/company.resolver';
import { CompanyNameResolver } from './resolvers/company-name/company-name.resolver';


const routes: Routes = [
  { path: '', component: HomeDemoThemeComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'home', component: HomeDemoThemeComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'login', component: DemoLoginComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'products/create', component: CreateProductComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'products/:partId/update', component: EditProductComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'users/:userId/view', component: UserProfileComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'orders/view', component: SalesOrdersComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'orders/:orderId/view', component: SalesOrderComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'cart', component: ShoppingcartComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'checkout', component: CheckoutComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'orderconfirmation', component: OrderconfirmationComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'adminproducts/:userId', component: AdminProductsComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'about', component: AboutComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'salesdashboard/:userId/view', component: DashboardSalesComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver, canActivate: [AuthGuardGuard] },
  { path: 'reports', component: ReportsComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver, canActivate: [AuthGuardGuard] },
  { path: 'messages', component: MessagesComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver, canActivate: [AuthGuardGuard] },
  { path: 'product', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
