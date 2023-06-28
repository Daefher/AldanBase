import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import * as globals from '../../globals';
import { CompanyInterface } from '../../interfaces/company-interface';
import { ContactInfo } from '../../interfaces/contact-info';
import { CompanyPage } from '../../interfaces/CompanyPage/company-page';
import { CompanyPageData } from '../../interfaces/CompanyPage/company-page-data';
import { CompanyMessage } from '../../interfaces/company-message';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private api_url = globals.api_url + "Company";
  private contact_url = globals.api_url + "ContactMessage";
  private companypage_url = globals.api_url + "CompanyPage";
  private company = new BehaviorSubject<CompanyInterface>({} as CompanyInterface);
  protected companyT: CompanyInterface;
  private company_host_name: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private http: HttpClient,
    private themeService: ThemeService,
  ) { }

  companyResolverFn() {
    this.company_host_name = window.location.hostname;
    this.chooseTheme(this.company_host_name);
    return this.getCompanyByHostNameResolver(this.company_host_name).pipe(
      catchError(error => {
        return of('No data');
      })
    );
  };

  update(post) {
    return this.http.post<CompanyInterface>(this.api_url + '/Update', JSON.stringify([post]), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getCompanyById(id): Observable<CompanyInterface> {
    return this.http.get<CompanyInterface>(this.api_url + '/GetById/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getCompanyByIdResolver(id): Observable<CompanyInterface> {
    return this.http.get<CompanyInterface>(this.api_url + '/GetById/' + id);
  }

  getCompanyByHostNameResolver(hostname): Observable<CompanyInterface> {
    if (hostname == "localhost") {
      hostname = "aldantech.tk";
    }
    return this.http.get<CompanyInterface>(this.api_url + '/GetByHostName/' + hostname);
  }

  findByUrl(url): Observable<CompanyInterface> {
    return this.http.get<CompanyInterface>(this.api_url + '/GetById/' + url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  //Company Messages section
  getCompanyMessages(companyId): Observable<CompanyMessage[]> {
    return this.http.get<CompanyMessage[]>(this.contact_url + '/GetByCompanyId', { params: { companyId: companyId } });
  }
  //CompanyPage section
  getCompanyPageByCompanyId(post): Observable<CompanyPage> {

    let qparams = {
      "CompanyId": post.CompanyId,
      "PageName": post.PageName
    };
    return this.http.get<CompanyPage>(this.companypage_url + '/GetCompanyPage', { params: qparams })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getCompanyPageData(post, section): Observable<CompanyPageData[]> {
    let qparams = {
      "companyId": post.companyId,
      "CompanyPageId": post.companyPageId,
      "SectionPosition": section
    };
    return this.http.get<CompanyPageData[]>(this.companypage_url + '/GetCompanyPageData', { params: qparams })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createCompanyPageData(post): Observable<CompanyPageData> {
    return this.http.post<CompanyPageData>(this.companypage_url + '/PageDataInsert', JSON.stringify([post]), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCompanyPageData(post): Observable<CompanyPageData> {
    return this.http.post<CompanyPageData>(this.companypage_url + '/PageDataUpdate', JSON.stringify([post]), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deactiveCompanyPageData(post): Observable<CompanyPageData> {
    return this.http.post<CompanyPageData>(this.companypage_url + '/CompanyPageCancel',
      JSON.stringify([post]), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCurrentCompany(hostname) {
    return this.company.asObservable();
  }

  setCurrentCompany(company: CompanyInterface) {
    this.company.next(company);
  }

  setCompany(company) {
    this.companyT = company;
  }

  getCompany() {
    return this.companyT;
  }

  createContactInfo(post): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(this.contact_url + '/Insert', JSON.stringify([post]), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  chooseTheme(hostname) {
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

}
