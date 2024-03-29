import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { companyNameResolverFn } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyService } from 'src/app/services/demo-company/company.service';

const routes: Routes = [
  {
    path: '', component: LoginComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn,
    children: [
      { path: '', component: LoginViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
