import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';
import { ProductComponent } from './product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { CreatePartComponent } from './components/create-part/create-part.component';
import { AuthGuardGuard } from '../../helpers/auth-guard.guard';

const routes: Routes = [
  {
    path: '', component: ProductComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
      { path: 'all', component: ProductsViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
      { path: ':partId/view', component: ProductViewComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
      { path: ':partId/edit', component: EditPartComponent, resolve: { company: CompanyResolver }, canActivate: [AuthGuardGuard], title: CompanyNameResolver },
      { path: 'create', component: CreatePartComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
