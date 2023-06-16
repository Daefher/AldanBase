import { Component } from '@angular/core';
import { CartService } from 'src/app/services/demo-cart/cart.service';
import * as globals from '../../../../globals';
import { ProductInterface } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent {
  prods_on_cart: number;
  cart = localStorage.getItem(globals.cartId);

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.getLSCart(this.cart).subscribe((value: ProductInterface[]) => {
      this.prods_on_cart = value.length;
    });
    window.scroll(0, 0);
  }

}
