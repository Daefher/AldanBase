import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { ThemeModule } from '../theme/theme.module';
import { RouterModule } from '@angular/router';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CartComponent,
    CartViewComponent,
    CartFormComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ThemeModule,
    RouterModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class CartModule { }
