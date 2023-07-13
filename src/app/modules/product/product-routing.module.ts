import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { companyNameResolverFn } from 'src/app/resolvers/company-name/company-name.resolver';
import { ProductComponent } from './product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { CreatePartComponent } from './components/create-part/create-part.component';
import { AuthGuardGuard } from '../../helpers/auth-guard.guard';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { canActivate } from 'src/app/helpers/auth-guardFn.guard';

const routes: Routes = [
  {
    path: '', component: ProductComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn,
    children: [
      { path: 'all', component: ProductsViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn },
      { path: ':partId/view', component: ProductViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn },
      { path: ':partId/edit', component: EditPartComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, canActivate: [canActivate], title: companyNameResolverFn },
      { path: 'create', component: CreatePartComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, canActivate: [canActivate], title: companyNameResolverFn },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
