import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { EditBannerDialogComponent } from './components/edit-banner-dialog/edit-banner-dialog.component';
import { CreateBannerDialogComponent } from './components/create-banner-dialog/create-banner-dialog.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    HomeComponent,
    HomeViewComponent,
    EditBannerDialogComponent,
    CreateBannerDialogComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    HomeRoutingModule,
    RouterModule,
    ThemeModule,  
    FormsModule,
    ReactiveFormsModule,   
    MatFormFieldModule, 
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class HomeModule { }