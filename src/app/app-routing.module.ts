import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from './helpers/auth-guard.guard';


import {
  
  HomeComponent,
  ProductsComponent,
  ProductComponent,
  HomeDemoThemeComponent,
  DemoLoginComponent,
  CreateProductComponent
  
} from "./components/index.pages";


const routes: Routes = [
  {path : '', component: HomeComponent},  
  {path : 'demo', component:HomeDemoThemeComponent},
  {path : 'demo/demo-login', component:DemoLoginComponent},
  {path : 'demo/demo-products', component:ProductsComponent},
  {path : 'demo/demo-products/create', component:CreateProductComponent, canActivate: [AuthGuardGuard]},
  {path : 'demo/demo-products/:partId/view', component: ProductComponent, pathMatch: 'full'}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
