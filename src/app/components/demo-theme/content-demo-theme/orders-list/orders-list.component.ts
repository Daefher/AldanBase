import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';



import * as globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../../../services/demo-orders/orders.service';
import { OrderInterface } from '../../../../interfaces/order-interface';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  public user;
  
  orders: any = [];

  constructor(
    private ordersService : OrdersService, 
    public authenticationService: AuthenticationService,
    private toastr: ToastrService
   
  ) { } 

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);

    this.ordersService.getAll().subscribe((data: OrderInterface[])=>{      
              
      this.orders = data;

      console.log("Ordenes",this.orders);
          
      
    },
    err =>{
      this.toastr.error("Error cargar las ordenes");  
    }
    ); 
  }

}
