import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { InventoryViewComponent } from './components/inventory-view/inventory-view.component';
import { CompanyNameResolver } from 'src/app/resolvers/company-name/company-name.resolver';
import { CompanyResolver } from 'src/app/resolvers/company-resolver/company.resolver';
import { OrdersDetailViewComponent } from './components/orders-detail-view/orders-detail-view.component';
import { AuthGuardGuard } from 'src/app/helpers/auth-guard.guard';

const routes: Routes = [
  {
    path: '', component: ManagementComponent, resolve: { company: CompanyResolver }, title: CompanyNameResolver,
    children: [
      { path: 'products', component: InventoryViewComponent, canActivate: [AuthGuardGuard], resolve: { company: CompanyResolver }, title: CompanyNameResolver },
      { path: 'orders-detail', component: OrdersDetailViewComponent, canActivate: [AuthGuardGuard], resolve: { company: CompanyResolver }, title: CompanyNameResolver }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
