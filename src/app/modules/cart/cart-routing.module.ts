import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { companyNameResolverFn } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyService } from 'src/app/services/demo-company/company.service';

const routes: Routes = [
  {
    path: '', component: CartComponent,resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn,
    children: [
      { path: '', component:CartViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn,}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
