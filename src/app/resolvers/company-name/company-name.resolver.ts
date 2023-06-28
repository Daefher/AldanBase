import { inject } from '@angular/core';
import { CompanyService } from '../../services/demo-company/company.service';
import { map, take } from 'rxjs/operators';

export const  companyNameResolverFn = () =>{
  const company_host_name = window.location.hostname;      
  return inject(CompanyService).getCompanyByHostNameResolver(company_host_name).pipe(    
    map(company => company[0].name), take(1)
  );
}