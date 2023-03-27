import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as globals from '../../globals';


import { OrderInterface } from '../../interfaces/order-interface';
import { FormGroup } from '@angular/forms';
import { SalesorderdtlInterface } from '../../interfaces/salesorderdtl-interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: any = {};
  loaded: boolean = false;

  private api_url = globals.api_url + "SalesOrder";
  private api_url_order_items  =   globals.api_url + "SalesOrderDtl";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  getAll(companyId): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(this.api_url + '/GetSalesOrders',{ params: { companyId: companyId } })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  
  getAllByDays(companyId, days): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(this.api_url + '/GetSalesOrdersbyDays',{ params: { companyId: companyId, days:days } })
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getByOrderId(salesOrderId){
    return this.http.get<SalesorderdtlInterface[]>(this.api_url_order_items + '/GetByOrderId/' + salesOrderId )
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //create(post): Observable<ProductInterface> {

  closeOrder(order): Observable<OrderInterface> {

    return this.http.post<OrderInterface>(this.api_url + '/Close', JSON.stringify([order]), this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    );
  }

  cancelOrder(order): Observable<OrderInterface> {

    return this.http.post<OrderInterface>(this.api_url + '/Cancel', JSON.stringify([order]), this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    );
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
