import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';

const routes: Routes = [
  {
    path: '', component: CartComponent,resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
      { path: '', component:CartViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver,}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
