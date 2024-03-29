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
import { EditProfileComponent } from './dialogs/edit-profile/edit-profile.component';
import { EditCompanyComponent } from './dialogs/edit-company/edit-company.component';
import { CompanyOrdersComponent } from './components/company-orders/company-orders.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AddBannerComponent } from './dialogs/add-banner/add-banner.component';
import { UpdateBannerComponent } from './dialogs/update-banner/update-banner.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProfilePictureComponent } from './dialogs/add-profile-picture/add-profile-picture.component';
import { EditProfilePictureComponent } from './dialogs/edit-profile-picture/edit-profile-picture.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ThemeViewComponent,
    HomeBannerComponent,
    ActionsBannerComponent,
    PageSectionComponent,
    EditPageSectionComponent,
    CreatePageSectionComponent,
    NewestProductsComponent, 
    ContactFormComponent, 
    EditProfileComponent, 
    EditCompanyComponent, 
    CompanyOrdersComponent, 
    SideNavComponent, 
    AddBannerComponent, 
    UpdateBannerComponent, 
    AppFooterComponent, AddProfilePictureComponent, EditProfilePictureComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
    MatInputModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    NavbarComponent,
    HomeBannerComponent,
    ActionsBannerComponent,
    PageSectionComponent,
    NewestProductsComponent,
    ContactFormComponent,
    CompanyOrdersComponent,
    SideNavComponent,
    UpdateBannerComponent,
    AddBannerComponent,
    AppFooterComponent,
    EditProfilePictureComponent,
    AddProfilePictureComponent
  ]
})
export class ThemeModule { }
