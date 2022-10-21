import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



import * as globals from '../../globals';
import { CompanyInterface } from '../../interfaces/company-interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private api_url = globals.api_url + "Company";

  private company =  new BehaviorSubject<CompanyInterface>({} as CompanyInterface);
 

  protected companyT : CompanyInterface;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

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
    if(hostname =="localhost"){
      hostname = "soxela";
    }
    return this.http.get<CompanyInterface>(this.api_url + '/GetByHostName/' + hostname);
      
  }

  findByUrl(url): Observable<CompanyInterface> {
    return this.http.get<CompanyInterface>(this.api_url + '/GetById/' + url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  

  getCurrentCompany(){
    return this.company.asObservable();
  }
 

  setCurrentCompany(company: CompanyInterface){
    this.company.next(company);
  }

  setCompany(company){
    this.companyT = company;
  }

  getCompany(){
    return this.companyT;
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

}
