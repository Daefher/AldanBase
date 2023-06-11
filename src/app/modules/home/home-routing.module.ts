import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';
import { HomeViewComponent } from './components/home-view/home-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
     { path: '', component: HomeViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
