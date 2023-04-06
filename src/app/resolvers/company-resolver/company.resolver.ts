import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThemeService } from '../../core/services/theme.service';
import { CompanyInterface } from '../../interfaces/company-interface';
import { CompanyService } from '../../services/demo-company/company.service';

@Injectable({
  providedIn: 'root'
})


export class CompanyResolver implements Resolve<any> {

  public company_host_name :string;
  private company :CompanyInterface
  constructor(
    private router: Router,
    private companyService: CompanyService,
    private themeService :ThemeService,
    ){

  }
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<any>{

      this.company_host_name = window.location.hostname;
      //console.log(this.company_host_name);
      //this.chooseCompany(this.company_host_name);
      
      //this.themeService.setTheme(this.company_host_name);
      //this.chooseTheme(this.company_host_name);
      this.chooseTheme(this.company_host_name);
      

    //return this.companyService.getCompanyByHostNameResolver(this.company_host_name).pipe(
    return this.companyService.getCompanyByHostNameResolver("aldantech.tk").pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }

  getHostName()
{ return this.company_host_name }

chooseTheme(hostname){
  switch (hostname) {
    case "localhost":
    case "aldantech.tk":
      this.themeService.setTheme("aldantech");      
    break;
    case "lamacetita.tk":
      this.themeService.setTheme("lamacetita");
    default:
      break;
  }
}



  chooseCompany(hostname){
    switch (hostname) {
      case 'localhost':        
      case 'aldantech': 
      // TODO:ADD THE GET COMPANY BY HOST NAME VALUE
        this.companyService.getCompanyById(10).subscribe(data => {         
          this.companyService.setCurrentCompany(data[0]);
          //this.companyService.setCompany(data[0]);
        });
        localStorage.removeItem("productsCart");
        return hostname;

      case 'lamacetita':
        this.companyService.getCompanyById(10).subscribe(data => {         
          this.companyService.setCurrentCompany(data[0]);
          //this.companyService.setCompany(data[0]);
        });
        localStorage.removeItem("productsCart");
        return hostname;
          
      default:
        break;
    }

  }
  handleError(error) {
    this.router.navigateByUrl('/404');
    return throwError(error);
  }
}
