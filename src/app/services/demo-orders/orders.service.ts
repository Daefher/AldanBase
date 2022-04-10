import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as globals from '../../globals';


import { OrderInterface } from '../../interfaces/order-interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: any = {};
  loaded: boolean = false;

  private api_url = globals.api_url + "TfOrder";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(this.api_url + '/GetTfOrders')
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
