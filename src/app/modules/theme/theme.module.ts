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

@NgModule({
  declarations: [
    NavbarComponent,    
    ThemeViewComponent, HomeBannerComponent, ActionsBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,    
  ],
  exports: [
    NavbarComponent,
    HomeBannerComponent
  ]
})
export class ThemeModule { }
