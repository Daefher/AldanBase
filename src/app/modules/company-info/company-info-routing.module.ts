import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from './company-info.component';
import { CompanyInfoViewComponent } from './components/company-info-view/company-info-view.component';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';
import { AuthGuardGuard } from 'src/app/helpers/auth-guard.guard';

const routes: Routes = [
  {
    path: '', component: CompanyInfoComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
      { path: 'profile', component: CompanyInfoViewComponent, canActivate: [AuthGuardGuard], resolve: { company: CompanyResolver }, title: CompanyNameResolver }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInfoRoutingModule { }
