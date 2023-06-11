import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeViewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ThemeModule,    
  ]
})
export class HomeModule { }