import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyInfoRoutingModule } from './company-info-routing.module';
import { CompanyInfoComponent } from './company-info.component';
import { CompanyInfoViewComponent } from './components/company-info-view/company-info-view.component';
import { CompanyProfileInfoComponent } from './components/company-profile-info/company-profile-info.component';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CompanyInfoComponent,
    CompanyInfoViewComponent,
    CompanyProfileInfoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CompanyInfoRoutingModule,
    RouterModule,
    ThemeModule, 
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,    
    MatProgressSpinnerModule,
    MatInputModule,  
    MatTableModule,
    MatPaginatorModule,
    MatListModule

  ]
})
export class CompanyInfoModule { }
