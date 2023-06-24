import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { OrderInterface } from 'src/app/interfaces/order-interface';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { OrdersService } from 'src/app/services/demo-orders/orders.service';

@Component({
  selector: 'app-orders-overall-info',
  templateUrl: './orders-overall-info.component.html',
  styleUrls: ['./orders-overall-info.component.scss']
})
export class OrdersOverallInfoComponent {
  @Input() company: CompanyInterface;
  loading: boolean;
  orders: OrderInterface[];
  length: number;
  orders_caceled: any;
  orders_caceled_length: number;
  orders_paypal: OrderInterface[];
  orders_paypal_length: number;
  orders_money: OrderInterface[];
  orders_money_length: number;
  color: ThemePalette = 'accent';

  constructor(private ordersService: OrdersService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.ordersService.getAllByDays(this.company.companyId, -800).subscribe((data: OrderInterface[]) => {
      this.orders = data;
      this.length = this.orders.length;
      this.orders_caceled = data.filter(order => order.canceled == true);
      this.orders_caceled_length = this.orders_caceled.length;
      this.orders_paypal = data.filter(order => order.paymentFormNum == 'PayPal');
      this.orders_paypal_length = this.orders_paypal.length;
      this.orders_money = data.filter(order => order.paymentFormNum == 'PagoContraEntrega');
      this.orders_money_length = this.orders_money.length;
      this.loading = false;
    },
      err => {
        this.toastr.error("Error cargar las ordenes");
        this.loading = false;
      }
    );
  }
}