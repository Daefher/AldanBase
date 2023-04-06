import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from './helpers/auth-guard.guard';

import {
  
  HomeComponent,
  ProductsComponent,
  ProductComponent,
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
  DashboardSalesComponent
  
} from "./components/index.pages";
import { OrderconfirmationComponent } from './components/demo-theme/content-demo-theme/orderconfirmation/orderconfirmation.component';
import { CompanyResolver } from './resolvers/company-resolver/company.resolver';
import { CompanyNameResolver } from './resolvers/company-name/company-name.resolver';


const routes: Routes = [
  {path : '', component: HomeDemoThemeComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver},  
  {path : 'demo', component:HomeDemoThemeComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver},
  {path : 'demo/demo-login', component:DemoLoginComponent, resolve: { company: CompanyResolver },title: CompanyNameResolver},
  {path : 'demo/demo-products', component:ProductsComponent, resolve: { company: CompanyResolver },title: CompanyNameResolver},
  {path : 'demo/demo-products/create', component:CreateProductComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard],title: CompanyNameResolver},
  {path : 'demo/demo-products/:partId/view', component: ProductComponent, resolve: { company: CompanyResolver }, pathMatch: 'full'}, 
  {path : 'demo/demo-products/:partId/update', component: EditProductComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard],title: CompanyNameResolver},
  {path : 'demo/demo-users/:userId/view', component: UserProfileComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard],title: CompanyNameResolver},
  {path : 'demo/demo-orders/view', component: SalesOrdersComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard],title: CompanyNameResolver},
  {path : 'demo/demo-orders/:orderId/view', component: SalesOrderComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard],title: CompanyNameResolver},
  {path : 'demo/demo-cart', component: ShoppingcartComponent, resolve: { company: CompanyResolver },title: CompanyNameResolver},
  {path : 'demo/demo-checkout', component: CheckoutComponent, resolve: { company: CompanyResolver },title: CompanyNameResolver},
  {path : 'demo/demo-orderconfirmation', component: OrderconfirmationComponent, resolve: { company: CompanyResolver },title: CompanyNameResolver},
  {path : 'demo/demo-adminproducts/:userId', component: AdminProductsComponent,resolve: { company: CompanyResolver },canActivate: [AuthGuardGuard],title: CompanyNameResolver},
  {path : 'demo/demo-about', component: AboutComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver},
  {path : 'demo/demo-salesdashboard/:userId/view', component: DashboardSalesComponent, resolve: { company: CompanyResolver}, title: CompanyNameResolver, canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
