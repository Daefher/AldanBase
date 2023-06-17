import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { OverlayContainer } from 'ngx-toastr';
import { SalesorderService } from 'src/app/services/demo-salesorder/salesorder.service';
import * as globals from '../../../../globals';
import { CompanyInterface } from 'src/app/interfaces/company-interface';

@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.scss']
})
export class CheckoutViewComponent {

  paymentFormArray: Array<Object>;
  selectedPaymentForm: string = "";
  mySelect: string;
  company: CompanyInterface;

  constructor(
    private salesOrderService: SalesorderService,
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    window.scroll(0, 0); //scroll to the top
    this.activatedRoute.data.subscribe((response: Data) => {
      this.company = response.company[0];
    });
    this.populateInitialCombos();
  }

  onPaymentFormChange(selected: any) {
    this.selectedPaymentForm = selected;
    this.updatePaymentFormLclStrg(selected); 
  }

  populateInitialCombos() {
    this.paymentFormArray = [
      { id: 0, name: "" },
      { id: "PagoContraEntrega", name: "Pago contra entrega" },
      { id: "PayPal", name: "PayPal" }
    ];
  }

  updatePaymentFormLclStrg(paymentForm: string) {
    var salesOrderLclStrg = localStorage.getItem(this.salesOrderService.lclStrgIdPayFrm);

    if (salesOrderLclStrg != null && salesOrderLclStrg != undefined) {
      if (salesOrderLclStrg.length > 0) {
        localStorage.removeItem(this.salesOrderService.lclStrgIdPayFrm);
      }
    }
    localStorage.setItem(this.salesOrderService.lclStrgIdPayFrm, paymentForm);
  }

}
