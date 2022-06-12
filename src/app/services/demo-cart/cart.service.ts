import { Injectable } from '@angular/core';
import { ProductsService } from '../../services/demo-products/products.service';
import { ProductInterface } from '../../interfaces/product-interface';
import * as globals from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  product : ProductInterface;

  constructor() { }

  public getLSCart(){
    var cart = localStorage.getItem(globals.cartId);

    if(cart != null)
    {
      var cartParsed = JSON.parse(cart);
      if(cartParsed != null)
        return cartParsed.sort(this.compare);
      else
        return null;
    }
    else
      return null;
  }

  public addToLSCart(item: ProductInterface, overrideQty: boolean){
    var cart = localStorage.getItem(globals.cartId);

    if(cart != null)
    {
      var cartParsed : ProductInterface[] = JSON.parse(cart);

      //Check if product exists in cart
      var result = cartParsed.filter((p) => {p.partId == item.partId});

      if(result.length > 0){
        if(!overrideQty)
          item.quantity += result[0].quantity;
        
          //Removing the existing element
          this.removePart(cartParsed, item.partId);
      }
      
      cartParsed.push(item);

      this.setLSCart(cartParsed);
    }
    else
    {
      var productCart : ProductInterface[] = [item];
      this.setLSCart(productCart);
    }
  }

  public updateCart(productsArray: ProductInterface[]){
    var cart = JSON.stringify(productsArray);
    localStorage.setItem(globals.cartId, cart);
  }

  public deletePartFromLSCart(product: ProductInterface){
    var cart = localStorage.getItem(globals.cartId);
    var currentCart : ProductInterface[];

    if(cart == null || cart == undefined)
      return;
    
    currentCart = JSON.parse(cart);

    //Check if part exists in cart
    if(currentCart != null)
    {
      var result = currentCart.filter((e) => {return e.partId == product.partId})

      if(result.length > 0)
        this.removePart(currentCart, product.partId);

      this.setLSCart(currentCart);
    }
    else
      return;
  }

  public clearLSCart(){
    localStorage.removeItem(globals.cartId);
  }

  private setLSCart(cartArray: ProductInterface[]){
    var cartJson = JSON.stringify(cartArray);
    localStorage.removeItem(globals.cartId);
    localStorage.setItem(globals.cartId, cartJson);
  }

  private removePart(currentCart: ProductInterface[], partId: number){
    currentCart.forEach((element,index)=>{
      if(element.partId == partId) {
          currentCart.splice(index, 1);
        }
    });
    return currentCart;
  }

  compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  } 
}
