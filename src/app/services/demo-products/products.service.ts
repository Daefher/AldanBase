import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as globals from '../../globals';


import { ProductInterface } from '../../interfaces/product-interface';
import { ProductQty } from '../../interfaces/product-qty';

import { FormGroup } from '@angular/forms';
import { activeDemand } from 'src/app/interfaces/active-demand';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: any = {};
  loaded: boolean = false;

  private api_url = globals.api_url + "Part";
  private api_url_quantity = globals.api_url + "PartQty";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  constructor(private http: HttpClient) { }

  getAll(companyId): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.api_url + '/GetParts', { params: { companyId: companyId } })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllActive(companyId): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.api_url + '/GetPartsNotCanceled', { params: { companyId: companyId } })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCanceled(companyId): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.api_url + '/GetPartsCanceled', { params: { companyId: companyId } })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getActiveDemand(active): Observable<activeDemand[]> {
    return this.http.get<any[]>(this.api_url + '/GetActiveDemandOfPart', { params: { active: active } })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(post): Observable<ProductInterface> {

    return this.http.post<ProductInterface>(this.api_url + '/Insert', JSON.stringify([post]), this.httpOptions)

      .pipe(

        catchError(this.errorHandler)

      );

  }

  getPartQty(id): Observable<ProductQty> {
    return this.http.get<ProductQty>(this.api_url_quantity + '/GetByPartId/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  adjustQty(post): Observable<ProductQty> {
    return this.http.post<ProductQty>(this.api_url_quantity + '/AdjustQuantity', JSON.stringify([post]), this.httpOptions)

      .pipe(

        catchError(this.errorHandler)

      );
  }

  UpdateQty(post): Observable<ProductQty> {
    return this.http.post<ProductQty>(this.api_url_quantity + '/Update', JSON.stringify([post]), this.httpOptions)

      .pipe(

        catchError(this.errorHandler)

      );
  }

  find(id): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(this.api_url + '/GetById/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id, post): Observable<ProductInterface> {

    return this.http.post<ProductInterface>(this.api_url + '/Update', JSON.stringify([post]), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );

  }

  delete(id) {
    let body = [
      { "PartId": id, "CanceledDateTime": new Date() }
    ];

    return this.http.post<ProductInterface>(this.api_url + '/Cancel', JSON.stringify(body), this.httpOptions)
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
}
