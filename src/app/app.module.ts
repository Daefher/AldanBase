import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { JWTInterceptorInterceptor } from './helpers/jwtinterceptor.interceptor';

//WSYIWYG
import { AngularEditorModule } from '@kolkov/angular-editor';




//Material
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';;
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';



//charts
import { NgChartsModule } from 'ng2-charts';

//toastr
import { ToastrModule } from 'ngx-toastr';

//Flex Layout 
//import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutModule } from '@angular/flex-layout';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home-theme/home/home.component';
import { FooterComponent } from './components/home-theme/footer/footer.component';
import { LoginComponent } from './components/home-theme/login/login.component';

import { HeaderComponent } from './components/home-theme/home-sub-components/header/header.component';
import { AboutComponent } from './components/demo-theme/content-demo-theme/about/about.component';
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
import { EditUserDialogComponent } from './components/demo-theme/content-demo-theme/dialogs/edit-user-dialog/edit-user-dialog.component';
import { FeatureProductsComponent } from './components/demo-theme/content-demo-theme/feature-products/feature-products.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ShoppingcartComponent } from './components/demo-theme/content-demo-theme/shopping-cart/shoppingcart.component';
import { ShoppingcartFormComponent } from './components/demo-theme/content-demo-theme/shopping-cart/shoppingcart-form/shoppingcart-form.component';
import { CheckoutComponent } from './components/demo-theme/content-demo-theme/checkout/checkout.component';
import { CheckoutFormComponent } from './components/demo-theme/content-demo-theme/checkout/checkout-form/checkout-form.component';
import { OrderconfirmationComponent } from './components/demo-theme/content-demo-theme/orderconfirmation/orderconfirmation.component';
import { AdminProductsComponent } from './components/demo-theme/content-demo-theme/admin-products/admin-products.component';
import { AdminProductsTableComponent } from './components/demo-theme/content-demo-theme/admin-products-table/admin-products-table.component';
import { ProductsSortPipe } from './pipes/productsPipes/products-sort.pipe';
import { EditHeaderDemoThemeComponent } from './components/demo-theme/header-demo-theme/edit-header-demo-theme/edit-header-demo-theme/edit-header-demo-theme.component';
import { CompanyService } from './services/demo-company/company.service';
import { EditCompanyDialogComponent } from './components/demo-theme/content-demo-theme/dialogs/company/edit-company-dialog/edit-company-dialog.component';
import { ContactFormComponent } from './components/demo-theme/content-demo-theme/contact-form/contact-form.component';
import { BannerComponent } from './components/demo-theme/content-demo-theme/dialogs/company/banner/banner.component';
import { EditBannerComponent } from './components/demo-theme/content-demo-theme/dialogs/company/edit-banner/edit-banner.component';
import { ProductListComponent } from './components/demo-theme/content-demo-theme/products/product-list/product-list.component';
import { TextAreaComponent } from './components/demo-theme/dynamic-componets/text-area/text-area.component';
import { TextFormComponent } from './components/demo-theme/dynamic-componets/text-area/text-form/text-form.component';
import { TextFormEditComponent } from './components/demo-theme/dynamic-componets/text-area/text-form-edit/text-form-edit.component';
import { DashboardSalesComponent } from './components/demo-theme/dashboard-sales/dashboard-sales.component';
import { GeneralInfoComponent } from './components/demo-theme/dashboard-sales/dashboard-elements/general-info/general-info.component';
import { SalesInfoComponent } from './components/demo-theme/dashboard-sales/dashboard-elements/sales-info/sales-info.component';
import { SalesInfoActiveOnlyComponent } from './components/demo-theme/dashboard-sales/dashboard-elements/sales-info-active-only/sales-info-active-only.component';
import { OrdersInfoComponent } from './components/demo-theme/dashboard-sales/dashboard-elements/orders-info/orders-info.component';
import { ReportsComponent } from './components/demo-theme/reports/reports.component';
import { ReportsTableComponent } from './components/demo-theme/reports/reports-table/reports-table.component';

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
    ShoppingcartComponent,
    ShoppingcartFormComponent,
    CheckoutComponent,
    CheckoutFormComponent,
    OrderconfirmationComponent,
    AdminProductsComponent,
    AdminProductsTableComponent,
    ProductsSortPipe,
    EditHeaderDemoThemeComponent,
    EditCompanyDialogComponent,
    ContactFormComponent,
    BannerComponent,
    EditBannerComponent,
    ProductListComponent,
    TextAreaComponent,
    TextFormComponent,
    TextFormEditComponent,
    DashboardSalesComponent,
    GeneralInfoComponent,
    SalesInfoComponent,
    SalesInfoActiveOnlyComponent,
    OrdersInfoComponent,
    ReportsComponent,
    ReportsTableComponent,
    
    
        
  ],
  imports: [    
    BrowserModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }), // ToastrModule added
    NgChartsModule,
    AngularEditorModule,
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
    MatTableModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressBarModule,
         
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorInterceptor, multi: true },
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
