import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityBoxComponent } from './activity-box.component';
import { MessagesViewComponent } from './components/messages-view/messages-view.component';
import { companyNameResolverFn } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { canActivate } from 'src/app/helpers/auth-guardFn.guard';

const routes: Routes = [
  {
    path: '', component: ActivityBoxComponent,resolve: { company: () => inject(CompanyService).companyResolverFn() }, title: companyNameResolverFn,
    children : [
     { path: 'messages', component: MessagesViewComponent, resolve: { company: () => inject(CompanyService).companyResolverFn() }, canActivate: [canActivate], title: companyNameResolverFn }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityBoxRoutingModule { }
