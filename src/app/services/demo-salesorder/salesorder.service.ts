import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as globals from '../../globals';
import { SalesOrderInterface } from 'src/app/interfaces/sales-order-interface';
import { SalesOrderDatasetInterface } from 'src/app/interfaces/sales-order-dataset-interface';

@Injectable({
  providedIn: 'root'
})
export class SalesorderService {

  arraySalesOrders: SalesOrderInterface[];
  public lclStrgId: string = "salesOrderData";
  public lclStrgIdPayFrm: string = "selectedCheckoutPaymentForm";
  public lclStrgIdPayPalCheckOutURL: string = "paypalCheckOutUrl";
  salesOrderLclStrg: string;

  private showControls = new BehaviorSubject(true);
  currentMessage = this.showControls.asObservable();

  private api_url = globals.api_url + "SalesOrder"
  private test_url = "assets/testData/products.page.json";

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',     
    })
  }

  constructor(private http : HttpClient)  { }

  insertSalesOrder(post): Observable<SalesOrderDatasetInterface> {
    var json: string = JSON.stringify(post);
    return this.http.post<SalesOrderDatasetInterface>(this.api_url + '/PayPal_Insert', json, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateCheckoutSalesOrderData(checkoutFormData: FormGroup){
    this.salesOrderLclStrg = localStorage.getItem(this.lclStrgId);
    
    if(this.salesOrderLclStrg != null && this.salesOrderLclStrg != undefined){
      var currentSalesOrder = JSON.parse(this.salesOrderLclStrg);

      //Check if a sales order is saved in local storage
      if(currentSalesOrder.length > 0) {
        localStorage.removeItem(this.lclStrgId);
      }
    }
    
    const salesOrderArray: SalesOrderInterface[] = [
      checkoutFormData.value
    ];

    this.salesOrderLclStrg = JSON.stringify(salesOrderArray);
    localStorage.setItem(this.lclStrgId, this.salesOrderLclStrg);
  }

  changeShowControls(message: boolean) {
    this.showControls.next(message)
  }

  getShowControls(){
    return this.showControls;
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
