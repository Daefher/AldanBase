import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';
import { ProductComponent } from './product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';

const routes: Routes = [
  {
    path: '', component: ProductComponent,  resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
      { path: 'all', component: ProductsViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
      { path: ':partId/view', component: ProductViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
