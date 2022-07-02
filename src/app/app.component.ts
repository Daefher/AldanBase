import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AldanBase';
  constructor( private router :  Router){}
 
  ngOnInit() {
    this.router.events
      // For newer versions or rxjs use a pipe on the filter:
       .pipe(filter(event => event instanceof NavigationEnd))
      //.pipe(event => event instanceof NavigationEnd)
      .subscribe(() => {
        
        document.querySelector('.mat-drawer-content ').scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        }
        ) ;
      });
  }
}
