import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyNameResolver implements Resolve<string> {
  public company_host_name :string;
  private company :CompanyInterface
  constructor(
    private router: Router,
    private companyService: CompanyService,
    ){

  }
  resolve(
    route: ActivatedRouteSnapshot,  
    ){

      this.company_host_name = window.location.hostname;
      //console.log(this.company_host_name);
      //this.chooseCompany(this.company_host_name);
      
      //this.themeService.setTheme(this.company_host_name);   
    
      //return this.companyService.getCompanyByHostNameResolver(this.company_host_name).pipe(
    return this.companyService.getCompanyByHostNameResolver("aldantech").pipe(
      map(company => company[0].name), take(1)
     );
    
  }
}
