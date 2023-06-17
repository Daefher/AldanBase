import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityBoxRoutingModule } from './activity-box-routing.module';
import { ActivityBoxComponent } from './activity-box.component';
import { ThemeModule } from '../theme/theme.module';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MessagesViewComponent } from './components/messages-view/messages-view.component';


@NgModule({
  declarations: [
    ActivityBoxComponent,
    MessagesViewComponent
  ],
  imports: [
    CommonModule,
    ActivityBoxRoutingModule,
    ThemeModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,    
    MatSlideToggleModule,
    MatDividerModule,  
    MatPaginatorModule,
     
    
  ]
})
export class ActivityBoxModule { }
