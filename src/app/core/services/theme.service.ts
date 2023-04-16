import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private company_theme =  new Subject<string>();
  company_themePicket =  this.company_theme.asObservable();
  constructor() { }

  setTheme(CurrentTheme:string) {
    this.company_theme.next(CurrentTheme+"-theme");
    //console.log(CurrentTheme+"-theme");
  }
  

}
