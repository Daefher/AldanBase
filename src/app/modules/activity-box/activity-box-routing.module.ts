import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityBoxComponent } from './activity-box.component';
import { MessagesViewComponent } from './components/messages-view/messages-view.component';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';

const routes: Routes = [
  {
    path: '', component: ActivityBoxComponent,resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children : [
     { path: 'messages', component: MessagesViewComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityBoxRoutingModule { }
