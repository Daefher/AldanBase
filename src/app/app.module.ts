import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { JWTInterceptorInterceptor } from './helpers/jwtinterceptor.interceptor';



//Material
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';




//toastr
import { ToastrModule } from 'ngx-toastr';

//Flex Layout 
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home-theme/home/home.component';
import { FooterComponent } from './components/home-theme/footer/footer.component';
import { LoginComponent } from './components/home-theme/login/login.component';

import { HeaderComponent } from './components/home-theme/home-sub-components/header/header.component';
import { AboutComponent } from './components/home-theme/home-sub-components/about/about.component';
import { ToolsComponent } from './components/home-theme/home-sub-components/tools/tools.component';
import { HomeDemoThemeComponent } from './components/demo-theme/home-demo-theme/home-demo-theme.component';
import { HeaderDemoThemeComponent } from './components/demo-theme/header-demo-theme/header-demo-theme.component';
import { FooterDemoThemeComponent } from './components/demo-theme/footer-demo-theme/footer-demo-theme.component';
import { ProductsComponent } from './components/demo-theme/content-demo-theme/products/products.component';
import { UsersComponent } from './components/demo-theme/content-demo-theme/users/users.component';
import { OrdersComponent } from './components/demo-theme/content-demo-theme/orders/orders.component';
import { ProductComponent } from './components/demo-theme/content-demo-theme/product/product.component';
import { NavDemoThemeComponent } from './components/demo-theme/nav-demo-theme/nav-demo-theme.component';
import { DemoLoginComponent } from './components/demo-theme/content-demo-theme/demo-login/demo-login.component';
import { CreateProductComponent } from './components/demo-theme/content-demo-theme/create-product/create-product.component';
import { EditProductComponent } from './components/demo-theme/content-demo-theme/edit-product/edit-product.component';
import { UserProfileComponent } from './components/demo-theme/content-demo-theme/user-profile/user-profile.component';
import { SalesOrdersComponent } from './components/demo-theme/content-demo-theme/sales-orders/sales-orders.component';
import { SalesOrderComponent } from './components/demo-theme/content-demo-theme/sales-order/sales-order.component';
import { OrdersListComponent } from './components/demo-theme/content-demo-theme/orders-list/orders-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditUserDialogComponent } from './components/demo-theme/content-demo-theme/dialogs/edit-user-dialog/edit-user-dialog.component';
import { FeatureProductsComponent } from './components/demo-theme/content-demo-theme/feature-products/feature-products.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    SidenavComponent,
    FooterComponent,
    LoginComponent,
    HeaderComponent,
    AboutComponent,
    ToolsComponent,
    HomeDemoThemeComponent,
    HeaderDemoThemeComponent,
    FooterDemoThemeComponent,
    ProductsComponent,
    UsersComponent,
    OrdersComponent,
    ProductComponent,
    NavDemoThemeComponent,
    DemoLoginComponent,
    CreateProductComponent,
    EditProductComponent,
    UserProfileComponent,
    SalesOrdersComponent,
    SalesOrderComponent,
    OrdersListComponent,
    EditUserDialogComponent,
    FeatureProductsComponent,
    SearchFilterPipe,
    
        
  ],
  imports: [    
    BrowserModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }), // ToastrModule added
    FlexLayoutModule,
    AppRoutingModule,
    MatCardModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSidenavModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
      
         
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
