import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";


//Mateial
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

//Flex Layout 
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/home-theme/sidenav/sidenav.component';
import { HomeComponent } from './components/home-theme/home/home.component';
import { FooterComponent } from './components/home-theme/footer/footer.component';
import { LoginComponent } from './components/home-theme/login/login.component';
import { HeaderComponent } from './components/home-theme/home-sub-components/header/header.component';
import { AboutComponent } from './components/home-theme/home-sub-components/about/about.component';
import { ToolsComponent } from './components/home-theme/home-sub-components/tools/tools.component';

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
  ],
  imports: [    
    BrowserModule,
    CommonModule,
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
      
         
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
