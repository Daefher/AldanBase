import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { OrderInterface } from 'src/app/interfaces/order-interface';
import { SalesorderdtlInterface } from 'src/app/interfaces/salesorderdtl-interface';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { OrdersService } from 'src/app/services/demo-orders/orders.service';

@Component({
  selector: 'app-company-orders',
  templateUrl: './company-orders.component.html',
  styleUrls: ['./company-orders.component.scss']
})
export class CompanyOrdersComponent {
  user: UserInterface;
  orders: OrderInterface[] = [];
  panelOpenState:boolean = false;
  ordersDtl: SalesorderdtlInterface[] = [];
  selectedResult: OrderInterface[];
  isLoading: boolean = true;
  closeIsLoading: boolean = false;
  length: number;
  pageSize:number = 10;
  pageSizeOptions: number[] = [5, 10, 30];
  pageEvent: PageEvent;
  company: CompanyInterface;

  constructor(
    private ordersService: OrdersService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentuser.subscribe((user: UserInterface) => this.user = user);
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
      this.mapInitializer(response.company[0]);
    });
  }

  mapInitializer(data) {
    this.ordersService.getAll(data.companyId).subscribe((data: OrderInterface[]) => {
      this.orders = data;
      this.orders.forEach(order => {
        order.createdDateTime = new Date(order.createdDateTime).toLocaleString();
      });
      console.log(this.orders);
      this.length = this.orders.length;
      this.selectedResult = this.orders.slice(0, this.pageSize);
      this.isLoading = false;
    },
      err => {
        this.toastr.error("Error cargar las ordenes");
        this.isLoading = false;
      }
    );
  }

  filterBy(type) {
    let new_filter;
    switch (type) {
      case 'closed':
        new_filter = this.orders.filter(item => item.closed === true);
        this.selectedResult = new_filter.slice(0, this.pageSize);
        break;
      case 'canceled':
        new_filter = this.orders.filter(item => item.canceled === true);
        this.selectedResult = new_filter.slice(0, this.pageSize);
        break;
      case 'notClosed':
        new_filter = this.orders.filter(item => item.closed === false && item.canceled === false);
        this.selectedResult = new_filter.slice(0, this.pageSize);
        break;
      case 'all':
        this.selectedResult = this.orders.slice(0, this.pageSize);
        break;
      default:
        break;
    }
  }

  closeOrder(orderId) {
    if (this.orders) {
      let order = this.orders.find(({ salesOrderId }) => salesOrderId === orderId);
      if (order) {
        order.closedDateTime = new Date().toJSON();
        this.closeIsLoading = true;
        this.ordersService.closeOrder(order).subscribe(() => {
          this.closeIsLoading = false;
          order.closed = true;
          this.toastr.success("Orden Cerrada Correctamente", "Exito");
        },
          error => {
            this.toastr.error("No se ha podido cerrar la orden, revise el inventario de productos", " Error ");
            this.closeIsLoading = false;
          });
      }
    }
  }

  cancelOrder(orderId) {
    if (this.orders) {
      let order = this.orders.find(({ salesOrderId }) => salesOrderId === orderId);
      if (order) {
        order.canceledDateTime = new Date().toJSON();
        this.ordersService.cancelOrder(order).subscribe(res => {
          this.toastr.success("Orden Cancelada Correctamente", "Exito");
          this.ordersService.getAll(this.company.companyId).subscribe((data: OrderInterface[]) => {
            this.orders = data;
            this.length = this.orders.length;
            this.selectedResult = this.orders.slice(0, this.pageSize);
          },
            err => {
              this.toastr.error("Error cargar las ordenes");
            }
          );
        },
          error => {
            this.toastr.error("Error", error);
          });
      }
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  trackByOrderDtl(index: any, orderDtl: { partName: string; }) {
    return orderDtl[0];
  }

  getData(event?: PageEvent) {
    if (event) {
      this.selectedResult = this.orders.slice(event.pageIndex * event.pageSize,
        event.pageIndex * event.pageSize + event.pageSize);
      return event;
    } else {
      return null;
    }
  }

  fetchPanelData(orderId) {
    this.ordersService.getByOrderId(orderId).subscribe((data: SalesorderdtlInterface[]) => {
      this.ordersDtl = (data);
    },
      err => {
        this.toastr.error("Error cargar las ordenes");
      }
    );
  }
}