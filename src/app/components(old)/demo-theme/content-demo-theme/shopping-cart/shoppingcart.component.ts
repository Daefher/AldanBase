import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/demo-cart/cart.service';
import { Subscription } from 'rxjs';
import * as globals from '../../../../globals';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {
  
  prods_on_cart : any;
  cart = localStorage.getItem(globals.cartId);

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getLSCart(this.cart).subscribe(value => {     
      this.prods_on_cart = value.length;
    } );


    window.scroll(0,0); //scroll to the top
  }

}
