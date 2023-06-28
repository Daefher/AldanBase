import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../theme/theme.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { OrderConfirmationViewComponent } from './components/order-confirmation-view/order-confirmation-view.component';
import { CartModule } from '../cart/cart.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutViewComponent,
    CheckoutFormComponent,
    OrderConfirmationViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CheckoutRoutingModule,
    RouterModule,
    ThemeModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    CartModule
  ]
})
export class CheckoutModule { }
