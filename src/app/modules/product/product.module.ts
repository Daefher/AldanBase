import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ThemeModule } from '../theme/theme.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { RouterModule } from '@angular/router';
import { ProductsSortPipe } from 'src/app/pipes/productsPipes/products-sort.pipe';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { MatInputModule } from '@angular/material/input';
import { CreatePartComponent } from './components/create-part/create-part.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsViewComponent,
    ProductListComponent,
    ProductViewComponent,
    //TODO: MOVE THIS PIPE TO THE THEME MODULE
    SearchFilterPipe,
    ProductsSortPipe,
    CreatePartComponent,
    EditPartComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    ThemeModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductModule { }
