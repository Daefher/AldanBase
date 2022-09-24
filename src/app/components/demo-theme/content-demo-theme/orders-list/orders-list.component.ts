import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { PageEvent } from '@angular/material/paginator';




import * as globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../../../services/demo-orders/orders.service';
import { OrderInterface } from '../../../../interfaces/order-interface';
import { SalesorderdtlInterface } from '../../../../interfaces/salesorderdtl-interface';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  public user;

  orders: any = [];
  panelOpenState = false;
  ordersDtl: any = [];


  selectedResult: any;
  isLoading = true;


  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 30];
  pageEvent: PageEvent;


  constructor(
    private ordersService: OrdersService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);

    this.ordersService.getAll(globals.company_id).subscribe((data: OrderInterface[]) => {

      this.orders = data;
      this.length = this.orders.length;
      this.selectedResult = this.orders.slice(0, this.pageSize);
      this.isLoading = false;



      console.log("Ordenes", this.orders);


    },
      err => {
        this.toastr.error("Error cargar las ordenes");
        this.isLoading = false;
      }
    );
  }
  

  filterBy(type){
    let new_filter;
    switch (type) {
      case 'closed':
        new_filter = this.orders.filter(item => item.closed === true);
        this.selectedResult = new_filter.slice(0, this.pageSize);

        //this.products.filter(tur => tur.name === status)

        break;
      case 'canceled':
         new_filter = this.orders.filter(item => item.canceled === true);
        this.selectedResult = new_filter.slice(0, this.pageSize);
        break;

      case 'notClosed':
        new_filter = this.orders.filter(item => item.closed === false);
        this.selectedResult = new_filter.slice(0, this.pageSize);
        break;

      case 'all':
        //new_filter = this.orders.filter(item => item.closed === false);
        this.selectedResult = this.orders.slice(0, this.pageSize);
      break;
    
      default:
        break;
    }
  }



  closeOrder(orderId) {
    if (this.orders) {
      //let order =  this.orders.find(x=>this.orders.salesOrderId == orderId);
      let order = this.orders.find(({ salesOrderId }) => salesOrderId === orderId);
      if (order) {
        order.closedDateTime = new Date().toJSON();
        console.log(order);
        this.ordersService.closeOrder(order).subscribe(res => {
          this.toastr.success("Orden Cerrada Correctamente", "Exito");

          //this.router.navigateByUrl('/product/'+this.product_id + '/view');
        },
          error => {
            this.toastr.error("Error", error);
          });;
      }

    }

  }

  cancelOrder(orderId) {
    if (this.orders) {
      //let order =  this.orders.find(x=>this.orders.salesOrderId == orderId);
      let order = this.orders.find(({ salesOrderId }) => salesOrderId === orderId);
      if (order) {
        order.canceledDateTime = new Date().toJSON();
        console.log(order);
        this.ordersService.cancelOrder(order).subscribe(res => {
          this.toastr.success("Orden Cancelada Correctamente", "Exito");
          this.ordersService.getAll(globals.company_id).subscribe((data: OrderInterface[]) => {

            this.orders = data;
            this.length = this.orders.length;
            this.selectedResult = this.orders.slice(0, this.pageSize);



            console.log("Ordenes", this.orders);


          },
            err => {
              this.toastr.error("Error cargar las ordenes");
            }
          );
          //this.router.navigateByUrl('/product/'+this.product_id + '/view');
        },
          error => {
            this.toastr.error("Error", error);
          });;
      }

    }

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  trackByOrderDtl(index: any, orderDtl: { partName: any; }) {

    return orderDtl[0];
  }

  getData(event?: PageEvent) {
    console.log(event);
    this.selectedResult = this.orders.slice(event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize);
    return event;
  }



  fetchPanelData(orderId) {

    this.ordersService.getByOrderId(orderId).subscribe((data: SalesorderdtlInterface[]) => {

      this.ordersDtl = (data);


      // console.log("OrderDtl",this.ordersDtl);


    },
      err => {
        this.toastr.error("Error cargar las ordenes");
      }
    );

  }

}
