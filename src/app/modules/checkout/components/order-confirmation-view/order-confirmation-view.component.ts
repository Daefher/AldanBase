import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { SalesOrderDatasetInterface } from 'src/app/interfaces/sales-order-dataset-interface';
import { SalesOrderInterface } from 'src/app/interfaces/sales-order-interface';
import { SalesorderdtlInterface } from 'src/app/interfaces/salesorderdtl-interface';
import { CartService } from 'src/app/services/demo-cart/cart.service';
import { SalesorderService } from 'src/app/services/demo-salesorder/salesorder.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-order-confirmation-view',
  templateUrl: './order-confirmation-view.component.html',
  styleUrls: ['./order-confirmation-view.component.scss']
})
export class OrderConfirmationViewComponent {

  //Subscribe to showControls flag
  showControls: boolean;
  subscription: Subscription;
  mySelect: string;
  paymentFormArray: Array<Object>;
  ds: SalesOrderDatasetInterface;
  loading: boolean = false;
  showPayPalPayButton: boolean = false;
  hideControls: boolean = false;
  company: CompanyInterface;

  constructor(
    private router: Router,
    private salesOrderService: SalesorderService,
    private shoppingCartService: CartService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0); //scroll to the top
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
    });
    this.subscription = this.salesOrderService.currentMessage.subscribe(message => this.showControls = message)
    this.changeShowControls(false)
    this.populateInitialCombos();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder() {
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
    var salesOrderLclStrg = localStorage.getItem(this.salesOrderService.lclStrgId);
    if (salesOrderLclStrg != null && salesOrderLclStrg != undefined) {
      currentSalesOrder = JSON.parse(salesOrderLclStrg);
      if (currentSalesOrder.length > 0) {
        //Set PaymentForm field
        var paymentFormLclStrg = localStorage.getItem(this.salesOrderService.lclStrgIdPayFrm);
        if (paymentFormLclStrg != null && paymentFormLclStrg != undefined) {
          if (paymentFormLclStrg.length > 0) {
            currentSalesOrder[0].PaymentFormNum = paymentFormLclStrg;
          }
        }
      }
    }
    //Add sales order details to dataset
    var cart = localStorage.getItem(globals.cartId);
    if (cart != null && cart != undefined) {
      var currentCart: ProductInterface[] = JSON.parse(cart);
      var count: number = 1;
      if (currentCart.length > 0) {
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
    currentSalesOrder[0].PhoneNumber = 11111;
    this.ds.lstSalesOrder.push(currentSalesOrder[0]);
    
    var redirectUrl: string = "";
    this.salesOrderService.insertSalesOrder(this.ds).subscribe((res: SalesOrderDatasetInterface) => {
      //Delete local storage variables     
      this.shoppingCartService.flushLSCart(this.salesOrderService.lclStrgId,this.salesOrderService.lclStrgIdPayFrm);     
      //NEW DATA FOR THE CART
      this.loading = false;
      if (res.links != null || res.links != undefined) {
        redirectUrl = res.links[1].href;
        localStorage.setItem(this.salesOrderService.lclStrgIdPayPalCheckOutURL, redirectUrl);
        this.hideControls = true;
        this.toastr.success("Pedido creado correctamente. Dando click en \"Pagar en PayPal\" lo redireccionará a realizar el pago.", "Exito");
        this.showPayPalPayButton = true;
      } else {
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