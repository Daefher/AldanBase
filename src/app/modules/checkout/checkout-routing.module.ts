import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';
import { companyNameResolverFn } from 'src/app/resolvers/company-name/company-name.resolver';
import { OrderConfirmationViewComponent } from './components/order-confirmation-view/order-confirmation-view.component';
import { CompanyService } from 'src/app/services/demo-company/company.service';

const routes: Routes = [
  {
    path: '', component: CheckoutComponent,resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn,
    children: [
      { path: '', component: CheckoutViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn, },
      { path: 'order-confirmation', component: OrderConfirmationViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn, }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
