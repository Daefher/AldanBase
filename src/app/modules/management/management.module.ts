import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { InventoryViewComponent } from './components/inventory-view/inventory-view.component';
import { ThemeModule } from '../theme/theme.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InventoryProductsTableComponent } from './components/inventory-products-table/inventory-products-table.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ManagementComponent,
    InventoryViewComponent,
    InventoryProductsTableComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ThemeModule, 
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatInputModule,  
    MatTableModule,
    MatPaginatorModule    
  ]
})
export class ManagementModule { }
