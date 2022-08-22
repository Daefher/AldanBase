import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';
import { SalesOrderDatasetInterface } from '../../../../interfaces/sales-order-dataset-interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../services/demo-cart/cart.service';
import { SalesorderService } from '../../../../services/demo-salesorder/salesorder.service';
import { SalesOrderInterface } from '../../../../interfaces/sales-order-interface';
import { ProductInterface } from '../../../../interfaces/product-interface';
import { SalesorderdtlInterface } from '../../../../interfaces/salesorderdtl-interface';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.scss']
})
export class OrderconfirmationComponent implements OnInit {

  //Subscribe to showControls flag
  showControls: boolean;
  subscription: Subscription;

  mySelect: string;
  paymentFormArray: Array<Object>;
  ds: SalesOrderDatasetInterface;
  loading = false;
  showPayPalPayButton: boolean = false;
  hideControls: boolean = false;

  constructor(private router: Router, private salesOrderService: SalesorderService, private shoppingCartService: CartService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    window.scroll(0, 0); //scroll to the top
    this.subscription = this.salesOrderService.currentMessage.subscribe(message => this.showControls = message)
    this.changeShowControls(false)
    this.populateInitialCombos();
    /*     console.log(location.pathname.split("/").slice(-1)[0] + " " + this.showControls);
     */    /* document.getElementById("formSelectState").setAttribute("disabled", "disabled");
       document.getElementById("formSelectPostalCode").setAttribute("disabled", "disabled");
       document.getElementById("formSelectCountry").setAttribute("disabled", "disabled"); */
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder(){
    this.loading = true;
    let obj: SalesOrderInterface[] = [];
    let obj2: SalesorderdtlInterface[] = [];
    const dsObj: SalesOrderDatasetInterface = {
      links: null,
      lstSalesOrder: obj,
      lstSalesOrderDtl: obj2
    };

    this.ds = dsObj;
    
    //Add sales order object to dataset
    var currentSalesOrder: SalesOrderInterface[];
    var salesOrderLclStrg: string = localStorage.getItem(this.salesOrderService.lclStrgId);
    if(salesOrderLclStrg != null && salesOrderLclStrg != undefined){
      currentSalesOrder = JSON.parse(salesOrderLclStrg);      

      if(currentSalesOrder.length > 0) {
        //Set PaymentForm field
        var paymentFormLclStrg: string = localStorage.getItem(this.salesOrderService.lclStrgIdPayFrm);
        if(paymentFormLclStrg != null && paymentFormLclStrg != undefined){
          if(paymentFormLclStrg.length > 0) {
            currentSalesOrder[0].PaymentFormNum = paymentFormLclStrg;
          }
        }        
      }
    }

    //Add sales order details to dataset
    var cart: string = localStorage.getItem(globals.cartId);
    if(cart != null && cart != undefined){
      var currentCart: ProductInterface[] = JSON.parse(cart);      
      
      var count: number = 1;
      if(currentCart.length > 0) {
          currentCart.forEach(element => {
            const dtlObj: SalesorderdtlInterface = {
              Line: count,
              PartId: element.partId,
              PartName: element.name,
              SalesOrderQuantity: element.quantity,
              UnitPrice: element.unitPrice,
              TaxesPerUnit: 0,
              Taxes: 0,
              Total: element.unitPrice * element.quantity,
              Discount: 0
            };

            //Calculate totals
            currentSalesOrder[0].Subtotal = Number(currentSalesOrder[0].Subtotal) + Number(dtlObj.Total);
            currentSalesOrder[0].Taxes = Number(currentSalesOrder[0].Taxes) + Number(0); //0 represent taxes
            currentSalesOrder[0].Total = Number(currentSalesOrder[0].Total) + Number(dtlObj.Total) + Number(0); //0 represent taxes

            this.ds.lstSalesOrderDtl.push(dtlObj);

            count = count + 1;
          });
      }
    }
    currentSalesOrder[0].Payed = currentSalesOrder[0].Total;
    this.ds.lstSalesOrder.push(currentSalesOrder[0]);

    var redirectUrl: string = "";
    this.salesOrderService.insertSalesOrder(this.ds).subscribe( res => {      

      //Delete local storage variables
      localStorage.removeItem(this.salesOrderService.lclStrgId);
      localStorage.removeItem(globals.cartId);
      localStorage.removeItem(this.salesOrderService.lclStrgIdPayFrm);

      

      //NEW DATA FOR THE CART


      this.loading = false;

      if(res.links != null || res.links != undefined){
        redirectUrl = res.links[1].href;
        localStorage.setItem(this.salesOrderService.lclStrgIdPayPalCheckOutURL, redirectUrl);
        this.hideControls = true;
        this.toastr.success("Pedido creado correctamente. Dando click en \"Pagar en PayPal\" lo redireccionará a realizar el pago.", "Exito");      
        this.showPayPalPayButton = true;
      }else{
        this.toastr.success("Pedido creado correctamente. En unos momentos recibirá un correo con la confirmación de la orden.", "Exito");      
        this.router.navigateByUrl("/");
      }      
    },
    error => {
      this.toastr.error("Error", error);
      this.loading = false;
    });    
  }
  redirectToPayPal() {
    this.openPayPalCheckOutIfApplies();
  }

  openPayPalCheckOutIfApplies() {
    var url = localStorage.getItem(this.salesOrderService.lclStrgIdPayPalCheckOutURL);

    if (url != null && url != undefined) {
      if (url.length > 0) {
        localStorage.removeItem(this.salesOrderService.lclStrgIdPayPalCheckOutURL);
        window.open(url);
        this.router.navigateByUrl("/");
      }
    }
  }

  populateInitialCombos() {
    this.paymentFormArray = [
      { id: 0, name: "" },
      { id: "PagoContraEntrega", name: "Pago contra entrega" },
      { id: "PayPal", name: "PayPal" }
    ];

    var paymentFormLclStrg = localStorage.getItem(this.salesOrderService.lclStrgIdPayFrm);
    if (paymentFormLclStrg != null && paymentFormLclStrg != undefined) {
      if (paymentFormLclStrg.length > 0) {
        this.mySelect = paymentFormLclStrg;
      }
    }
  }

  changeShowControls(bl: boolean) {
    this.salesOrderService.changeShowControls(bl)
  }

}
