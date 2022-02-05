import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SidenavComponent,
  HomeComponent  
  
} from "./components/index.pages";


const routes: Routes = [
  {path : '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
