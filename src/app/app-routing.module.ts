import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  
  HomeComponent,

  
} from "./components/index.pages";


const routes: Routes = [
  {path : '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
