import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../theme/theme.module';
import { AboutViewComponent } from './components/about-view/about-view.component';

@NgModule({
  declarations: [
    AboutComponent,
    AboutViewComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    RouterModule,
    ThemeModule
  ]
})
export class AboutModule { }