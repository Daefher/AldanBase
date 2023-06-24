import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';

const routes: Routes = [
  {
    path: '', component: CheckoutComponent,resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
      { path: '', component: CheckoutViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver, }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
