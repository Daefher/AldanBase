import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from './company-info.component';
import { CompanyInfoViewComponent } from './components/company-info-view/company-info-view.component';
import { companyNameResolverFn } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { canActivate } from 'src/app/helpers/auth-guardFn.guard';

const routes: Routes = [
  {
    path: '', component: CompanyInfoComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn,
    children: [
      { path: 'profile', component: CompanyInfoViewComponent, canActivate: [canActivate], resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInfoRoutingModule { }
