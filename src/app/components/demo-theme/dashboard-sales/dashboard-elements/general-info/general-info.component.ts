import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderInterface } from '../../../../../interfaces/order-interface';
import { CompanyService } from '../../../../../services/demo-company/company.service';
import { AuthenticationService } from '../../../../../services/demo-login/authentication.service';
import { OrdersService } from '../../../../../services/demo-orders/orders.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  @Input() company : any;

  public loading : boolean;
  public orders : OrderInterface[];
  public length : number;

  public orders_caceled: any;
  public orders_caceled_length : number;

  public orders_paypal : OrderInterface[];
  public orders_paypal_length : number;

  public orders_money : OrderInterface[];
  public orders_money_length : number;

  color: ThemePalette = 'accent';

  constructor(private ordersService: OrdersService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private companyService : CompanyService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.ordersService.getAllByDays(this.company.companyId, -800).subscribe((data: OrderInterface[]) => {

      this.orders = data;
      this.length = this.orders.length;

      this.orders_caceled =  data.filter(order => order.canceled == true);
      this.orders_caceled_length = this.orders_caceled.length;

      this.orders_paypal =  data.filter(order => order.paymentFormNum == 'PayPal');
      this.orders_paypal_length = this.orders_paypal.length;

      this.orders_money = data.filter(order => order.paymentFormNum == 'PagoContraEntrega');
      this.orders_money_length = this.orders_money.length;
      
      this.loading = false;
      console.log(this.orders);

    },
      err => {
        this.toastr.error("Error cargar las ordenes");
        this.loading = false;
      }
    );
  }
  

}
