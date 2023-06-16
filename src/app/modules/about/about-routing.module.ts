import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';
import { AboutViewComponent } from './components/about-view/about-view.component';

const routes: Routes = [
  {
    path: '', component: AboutComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
      { path: '', component: AboutViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
