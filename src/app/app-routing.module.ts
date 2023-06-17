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
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'product', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },  
  { path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) },
  { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'checkout', loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'home2', component: HomeDemoThemeComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'login2', component: DemoLoginComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'products/create', component: CreateProductComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'products/:partId/update', component: EditProductComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'users/:userId/view', component: UserProfileComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'orders/view', component: SalesOrdersComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'orders/:orderId/view', component: SalesOrderComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'cart2', component: ShoppingcartComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'checkout2', component: CheckoutComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'orderconfirmation', component: OrderconfirmationComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'adminproducts/:userId', component: AdminProductsComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
  { path: 'about2', component: AboutComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
  { path: 'salesdashboard/:userId/view', component: DashboardSalesComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver, canActivate: [AuthGuardGuard] },
  { path: 'reports', component: ReportsComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver, canActivate: [AuthGuardGuard] },
  { path: 'messages', component: MessagesComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver, canActivate: [AuthGuardGuard] },
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
