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
  SalesOrderComponent
  
} from "./components/index.pages";


const routes: Routes = [
  {path : '', component: HomeComponent},  
  {path : 'demo', component:HomeDemoThemeComponent},
  {path : 'demo/demo-login', component:DemoLoginComponent},
  {path : 'demo/demo-products', component:ProductsComponent},
  {path : 'demo/demo-products/create', component:CreateProductComponent, canActivate: [AuthGuardGuard]},
  {path : 'demo/demo-products/:partId/view', component: ProductComponent, pathMatch: 'full'}, 
  {path : 'demo/demo-products/:partId/update', component: EditProductComponent, canActivate: [AuthGuardGuard]},
  {path : 'demo/demo-users/:userId/view', component: UserProfileComponent, canActivate: [AuthGuardGuard]},
  {path : 'demo/demo-orders/view', component: SalesOrdersComponent, canActivate: [AuthGuardGuard]},
  {path : 'demo/demo-orders/:orderId/view', component: SalesOrderComponent, canActivate: [AuthGuardGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
