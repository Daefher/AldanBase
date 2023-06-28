import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { companyNameResolverFn } from 'src/app/resolvers/company-name/company-name.resolver';
import { AboutViewComponent } from './components/about-view/about-view.component';
import { CompanyService } from 'src/app/services/demo-company/company.service';

const routes: Routes = [
  {
    path: '', component: AboutComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn,
    children: [
      { path: '', component: AboutViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
