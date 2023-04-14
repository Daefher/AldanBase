import { Component, HostBinding } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from './core/services/theme.service';
import { company_id } from './globals';
import { CompanyInterface } from './interfaces/company-interface';
import { CompanyService } from './services/demo-company/company.service';
import { AuthenticationService } from './services/demo-login/authentication.service';
import * as globals from './globals';

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
  current_theme : any;
  public company :CompanyInterface;
  @HostBinding('class') componentCssClass;
  favIcon: HTMLLinkElement = document.querySelector('#appFavicon');

 
  constructor(
      private router :  Router,
      public authenticationService: AuthenticationService,
      private companyService : CompanyService,
      public themeService: ThemeService
    ){
     
    }
   
  onSetTheme(theme) {   
    this.componentCssClass = theme;
  }
  ngOnInit() {
    this.authenticationService.currentuser.subscribe(user => this.user = user);   
    
    //this.companyService.findBy();
    this.current_theme =  this.themeService.company_themePicket;
   
    this.router.events
      // For newer versions or rxjs use a pipe on the filter:
       .pipe(filter(event => event instanceof NavigationEnd))
      //.pipe(event => event instanceof NavigationEnd)
      .subscribe(() => {      
        this.loading = false; 
       //this.companyService.getCompanyByHostNameResolver("aldantech.tk")
        this.companyService.getCompanyByHostNameResolver("aldantech.tk").subscribe( data =>{
        //this.companyService.getCompanyByHostNameResolver(this.company_host_name).subscribe( data =>{

          this.company = data;
         
          this.favIcon.href = globals.img_path + this.company[0].companyId + '/favicon.ico';
          //console.log("DATA",data);
        }) 
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
          this.company = data[0];
          //console.log("choose", this.company);
          //console.log(data[0]);         
        });

        localStorage.removeItem("productsCart");
        break     
      default:
        break;
    }

  }
}
