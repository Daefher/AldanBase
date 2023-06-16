import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ThemeViewComponent } from './components/theme-view/theme-view.component';
import { RouterModule } from '@angular/router';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { ActionsBannerComponent } from './components/actions-banner/actions-banner.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PageSectionComponent } from './components/page-section/page-section.component';
import { EditPageSectionComponent } from './components/edit-page-section/edit-page-section.component';
import { CreatePageSectionComponent } from './components/create-page-section/create-page-section.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxColorsModule } from 'ngx-colors';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NewestProductsComponent } from './components/newest-products/newest-products.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@NgModule({
  declarations: [
    NavbarComponent,    
    ThemeViewComponent, 
    HomeBannerComponent, 
    ActionsBannerComponent, 
    PageSectionComponent, 
    EditPageSectionComponent, 
    CreatePageSectionComponent, 
    NewestProductsComponent, ContactFormComponent
  ],
  imports: [
    CommonModule,
    NgxColorsModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,    
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,   
    MatFormFieldModule, 
    AngularEditorModule,
    MatSlideToggleModule,  
    MatCardModule,
    MatInputModule 
  ],
  exports: [
    NavbarComponent,
    HomeBannerComponent,
    ActionsBannerComponent,
    PageSectionComponent,
    NewestProductsComponent,
    ContactFormComponent
  ]
})
export class ThemeModule { }
