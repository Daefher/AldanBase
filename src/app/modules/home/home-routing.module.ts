import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { companyNameResolverFn } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { CompanyService } from 'src/app/services/demo-company/company.service';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn ,
    children: [
     { path: '', component: HomeViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
