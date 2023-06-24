import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInterface } from '../../../../interfaces/company-interface';
import { SalesorderdtlInterface } from '../../../../interfaces/salesorderdtl-interface';
import { SalesorderService } from '../../../../services/demo-salesorder/salesorder.service';
import * as globals from '../../../../globals';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  paymentFormArray: Array<Object>;
  selectedPaymentForm: string = "";
  mySelect: string;

  private company : CompanyInterface;

  constructor(
    private salesOrderService : SalesorderService,
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer
    ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;    
    globals.chooseTheme(hostname, this.overlayContainer);
    
    window.scroll(0,0); //scroll to the top
    this.activatedRoute.data.subscribe((response: any) => {
      this.company = response.company[0];          
     });
    this.populateInitialCombos();
  }

  onPaymentFormChange(selected: any){
    this.selectedPaymentForm = selected;
    this.updatePaymentFormLclStrg(selected);
    //console.log(this.mySelect);
    //this.populateSalesOrderData()
    /* console.log("PaymentFormNum: " + this.mySelect + ", PaymentFormName: " + this.selectedPaymentForm); */
  }

  populateInitialCombos(){
    this.paymentFormArray =  [
      {id: 0, name: ""},
      {id: "PagoContraEntrega", name: "Pago contra entrega"},
      {id: "PayPal", name: "PayPal"}
    ];
  }

  updatePaymentFormLclStrg(paymentForm: string){
    var salesOrderLclStrg = localStorage.getItem(this.salesOrderService.lclStrgIdPayFrm);
    
    if(salesOrderLclStrg != null && salesOrderLclStrg != undefined){
      if(salesOrderLclStrg.length > 0) {
        localStorage.removeItem(this.salesOrderService.lclStrgIdPayFrm);
      }
    }

    localStorage.setItem(this.salesOrderService.lclStrgIdPayFrm, paymentForm);
  }

}
