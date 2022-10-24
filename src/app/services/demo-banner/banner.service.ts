import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../../globals';
import { catchError, map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { BannerInterface } from '../../interfaces/banner-interface';
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private api_url = globals.api_url + "CompanyFile";


  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',     
    })
  }

  constructor(private http: HttpClient ) { }


  create(post): Observable<BannerInterface> {

    return this.http.post<BannerInterface>(this.api_url + '/UploadFileBase64', JSON.stringify(post), this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    );

  }

  /* delete(id){
    let body = [
      { "PartId": id, "CanceledDateTime": new Date() }
    ];
    return this.http.post<ProductInterface>(this.api_url + '/Cancel', JSON.stringify(body), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } */
  delete(id){
    let body = [
      { "companyFileId": id, "CanceledDateTime": new Date() }
    ];

    return this.http.post(this.api_url + '/Cancel', JSON.stringify(body), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )

  }

  getImage(FileName): Observable<BannerInterface[]> {
    return this.http.get<BannerInterface[]>(this.api_url + '/GetActiveCompanyFiles?name=' + FileName)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }


}
