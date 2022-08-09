import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesorderdtlInterface } from 'src/app/interfaces/salesorderdtl-interface';
import { SalesorderService } from 'src/app/services/demo-salesorder/salesorder.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  paymentFormArray: Array<Object>;
  selectedPaymentForm: string = "";
  mySelect: string;

  constructor(private salesOrderService : SalesorderService) { }

  ngOnInit(): void {
    window.scroll(0,0); //scroll to the top
    this.populateInitialCombos();
  }

  onPaymentFormChange(selected: any){
    this.selectedPaymentForm = selected.selectedOptions[0].outerText;
    this.updatePaymentFormLclStrg(this.mySelect);
    // this.populateSalesOrderData()
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
    var salesOrderLclStrg: string = localStorage.getItem(this.salesOrderService.lclStrgIdPayFrm);
    
    if(salesOrderLclStrg != null && salesOrderLclStrg != undefined){
      if(salesOrderLclStrg.length > 0) {
        localStorage.removeItem(this.salesOrderService.lclStrgIdPayFrm);
      }
    }

    localStorage.setItem(this.salesOrderService.lclStrgIdPayFrm, paymentForm);
  }

}
