import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';

const routes: Routes = [
  {
    path: '', component: LoginComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
      { path: '', component: LoginViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
