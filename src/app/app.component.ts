import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { company_id } from './globals';
import { CompanyService } from './services/demo-company/company.service';
import { AuthenticationService } from './services/demo-login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AldanBase';
  user : any;
  company_host_name :  string;
  loading = true;
  constructor(
      private router :  Router,
      public authenticationService: AuthenticationService,
      private companyService : CompanyService
    ){
     
    }
 
  ngOnInit() {
    this.authenticationService.currentuser.subscribe(user => this.user = user);   
    
    //this.companyService.findBy();
     
   
    this.router.events
      // For newer versions or rxjs use a pipe on the filter:
       .pipe(filter(event => event instanceof NavigationEnd))
      //.pipe(event => event instanceof NavigationEnd)
      .subscribe(() => {      
        this.loading = false;  
        document.querySelector('.mat-drawer-content ')!.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        }
        );      

      });
      this.router.events.subscribe(ev => {
        if (ev instanceof NavigationStart) {
          this.loading = true;
        }
        if (
          
          ev instanceof NavigationCancel ||
          ev instanceof NavigationError
        ) {
          this.loading = false;
        }
      });
     
  }

  //ADD to this switch when the new company added
  chooseCompany(hostname){
    switch (hostname) {
      case 'localhost':       
      case 'aldantech': 
      // TODO:ADD THE GET COMPANY BY HOST NAME VALUE
        this.companyService.getCompanyById(10).subscribe(data => {         
          this.companyService.setCurrentCompany(data[0]);
          this.companyService.setCompany(data[0]);
          //console.log(data[0]);         
        });

        localStorage.removeItem("productsCart");
        break     
      default:
        break;
    }

  }
}
