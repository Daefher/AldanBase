import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { SalesOrderInterface } from 'src/app/interfaces/sales-order-interface';
import { SalesorderService } from 'src/app/services/demo-salesorder/salesorder.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {

  //Subscribe to showControls flag
  showControls: boolean;
  
  subscription: Subscription;
  salesOrderLclStrg: any;
  loading = false;
  submitted = false;
  salesOrderData: SalesOrderInterface;
  createSalesOrderForm: FormGroup;
  coveredPostalCodes: Array<any>;
  statesList: Array<Object>;
  countryList: Array<Object>;
  cp: unknown;
  @Input() company: CompanyInterface;
  @Input() formState: boolean;
  disabled: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public salesOrderService: SalesorderService,
    private toastr: ToastrService,
  ) {
    this.coveredPostalCodes = [
      {
        "cp": "11850"
      },
      {
        "cp": "52787"
      },
      {
        "cp": "52763"
      },
      {
        "cp": "52784"
      },
      {
        "cp": "52779"
      },
      {
        "cp": "52785"
      },
      {
        "cp": "52788"
      },
      {
        "cp": "52780"
      },
      {
        "cp": "52930"
      },
      {
        "cp": "52967"
      },
      {
        "cp": "52938"
      },
      {
        "cp": "52774"
      },
      {
        "cp": "52783"
      },
      {
        "cp": "14140"
      },
      {
        "cp": "11510"
      },
      {
        "cp": "11530"
      },
      {
        "cp": "11540"
      },
      {
        "cp": "11550"
      },
      {
        "cp": "11560"
      },
      {
        "cp": "53283"
      },
      {
        "cp": "11950"
      },
      {
        "cp": "14220"
      },
      {
        "cp": "14200"
      },
      {
        "cp": "14210"
      },
      {
        "cp": "11520"
      },
      {
        "cp": "11529"
      },
      {
        "cp": "11000"
      },
      {
        "cp": "11930"
      },
      {
        "cp": "11700"
      },
      {
        "cp": "04250"
      },
      {
        "cp": "11320"
      },
      {
        "cp": "11590"
      },
      {
        "cp": "04630"
      },
      {
        "cp": "04300"
      },
      {
        "cp": "04460"
      },
      {
        "cp": "04730"
      },
      {
        "cp": "04918"
      },
      {
        "cp": "04200"
      },
      {
        "cp": "04938"
      },
      {
        "cp": "04100"
      },
      {
        "cp": "04360"
      },
      {
        "cp": "04210"
      },
      {
        "cp": "04530"
      },
      {
        "cp": "04890"
      },
      {
        "cp": "04500"
      },
      {
        "cp": "03900"
      },
      {
        "cp": "03730"
      },
      {
        "cp": "03800"
      },
      {
        "cp": "03660"
      },
      {
        "cp": "03540"
      },
      {
        "cp": "03640"
      },
      {
        "cp": "03100"
      },
      {
        "cp": "03103"
      },
      {
        "cp": "03104"
      },
      {
        "cp": "03200"
      },
      {
        "cp": "03600"
      },
      {
        "cp": "03530"
      },
      {
        "cp": "03740"
      },
      {
        "cp": "03580"
      },
      {
        "cp": "03910"
      },
      {
        "cp": "03510"
      },
      {
        "cp": "03810"
      },
      {
        "cp": "03023"
      },
      {
        "cp": "03020"
      },
      {
        "cp": "03500"
      },
      {
        "cp": "03330"
      },
      {
        "cp": "03920"
      },
      {
        "cp": "03520"
      },
      {
        "cp": "03650"
      },
      {
        "cp": "01730"
      },
      {
        "cp": "01376"
      },
      {
        "cp": "01790"
      },
      {
        "cp": "01219"
      },
      {
        "cp": "01620"
      },
      {
        "cp": "01863"
      },
      {
        "cp": "01090"
      },
      {
        "cp": "01010"
      },
      {
        "cp": "01510"
      },
      {
        "cp": "01000"
      },
      {
        "cp": "01060"
      },
      {
        "cp": "03840"
      },
      {
        "cp": "01780"
      },
      {
        "cp": "01400"
      },
      {
        "cp": "01408"
      },
      {
        "cp": "03240"
      },
      {
        "cp": "01710"
      },
      {
        "cp": "01750"
      },
      {
        "cp": "01120"
      },
      {
        "cp": "01020"
      },
      {
        "cp": "01900"
      },
      {
        "cp": "01030"
      },
      {
        "cp": "01070"
      },
      {
        "cp": "01430"
      },
      {
        "cp": "01610"
      },
      {
        "cp": "01759"
      },
      {
        "cp": "06140"
      },
      {
        "cp": "06500"
      },
      {
        "cp": "05500"
      },
      {
        "cp": "05000"
      },
      {
        "cp": "05348"
      },
      {
        "cp": "06700"
      },
      {
        "cp": "06760"
      },
      {
        "cp": "06470"
      },
      {
        "cp": "05120"
      },
      {
        "cp": "06100"
      },
      {
        "cp": "06170"
      },
      {
        "cp": "06600"
      },
      {
        "cp": "53100"
      }
    ];
  }

  ngOnInit(): void {
    this.subscription = this.salesOrderService.currentMessage.subscribe(message => this.showControls = message);    
    
    if (this.matchExact(location.href.split("/").slice(-1)[0], "checkout")) {
      this.changeShowControls(true)
    }
    this.createSalesOrderForm = this.formBuilder.group({
      CreatedDateTime: [new Date],
      CompanyId: [this.company.companyId],
      Subtotal: ['',],
      Taxes: ['',],
      Total: ['',],
      Payed: ['',],
      Change: [0],
      CurrencyNum: "MXN",
      PaymentFormNum: ['',],
      phoneNumber:[1111,],
      TotalDiscount: [0],
      PayPalFullName: ['', Validators.required],
      PayPalAddressLine1: ['', Validators.required],
      PayPalAddressLine2: ['',],
      PayPalAdminArea2: ['', Validators.required],
      PayPalAdminArea1: ['', Validators.required],
      PayPalPostalCode: ['', Validators.required],
      PayPalCountryCode: ['MX', Validators.required],
      CustomerEmail: ['', Validators.required]
    });
    this.populateInitialCombos();
    //Look for sales order json in local storage. if there is one, load the visible fields with data from json
    if(!this.formState)this.populateSalesOrderData();
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createSalesOrderForm.invalid) {
      return;
    }
    this.loading = true;
    this.salesOrderService.updateCheckoutSalesOrderData(this.createSalesOrderForm);
    this.router.navigateByUrl("checkout/order-confirmation");
  }

  checkIfPostalCodeExist(control) {
    let exist = false;
    if (this.coveredPostalCodes) {
      for (let element of this.coveredPostalCodes) {
        if (control.value === element.cp) {
          exist = true;
        }
      }
    }
    if (!exist) {
      this.toastr.info("El código postal ingresado está fuera de nuestra area de servicio.", "Aviso");
    }

  }

  populateSalesOrderData() {
    this.salesOrderLclStrg = localStorage.getItem(this.salesOrderService.lclStrgId);
    if (this.salesOrderLclStrg != null || this.salesOrderLclStrg != undefined) {
      //Updating fields
      var currentSalesOrder = JSON.parse(this.salesOrderLclStrg);
      this.createSalesOrderForm.patchValue({
        Subtotal: 0,
        Taxes: 0,
        Total: 0,
        Payed: 0,
        Change: 0,
        CurrencyNum: currentSalesOrder[0].CurrencyNum,
        TotalDiscount: 0,
        PayPalFullName: currentSalesOrder[0].PayPalFullName,
        PayPalAddressLine1: currentSalesOrder[0].PayPalAddressLine1,
        PayPalAddressLine2: currentSalesOrder[0].PayPalAddressLine2,
        PayPalAdminArea2: currentSalesOrder[0].PayPalAdminArea2,
        PayPalAdminArea1: currentSalesOrder[0].PayPalAdminArea1,
        PayPalPostalCode: currentSalesOrder[0].PayPalPostalCode,
        PayPalCountryCode: currentSalesOrder[0].PayPalCountryCode,
        CreatedDateTime: currentSalesOrder[0].CreatedDateTime,
        CustomerEmail: currentSalesOrder[0].CustomerEmail,      
      });   
    }
    this.createSalesOrderForm.disable();    
    this.salesOrderData = this.createSalesOrderForm.value;
  }

  populateInitialCombos() {
    this.statesList = [
      { id: "", name: "" },
      { id: "DF", name: "CDMX" }
    ];
    this.countryList = [
      { id: "", name: "" },
      { id: "MX", name: "México" }
    ];
  }

  get f() {
    return this.createSalesOrderForm.controls;
  }

  changeShowControls(bl: boolean) {
    this.salesOrderService.changeShowControls(bl)
  }

  matchExact(r, str) {
    var match = str.match(r);
    return match && str === match[0];
  }

}
