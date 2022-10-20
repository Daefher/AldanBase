import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as globals from '../../../../../globals';
import { CartService } from '../../../../../services/demo-cart/cart.service';
import { SalesorderService } from '../../../../../services/demo-salesorder/salesorder.service';
import { ProductInterface } from '../../../../../interfaces/product-interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CompanyInterface } from '../../../../../interfaces/company-interface';

@Component({
  selector: 'app-shoppingcart-form',
  templateUrl: './shoppingcart-form.component.html',
  styleUrls: ['./shoppingcart-form.component.scss']
})
export class ShoppingcartFormComponent implements OnInit {

  //Subscribe to showControls flag
  showControls: boolean;
  subscription: Subscription;
  image_path = globals.img_path;
 
  
  shopCartItems: any = [];
  sumOfCart: number;
  
  numberOfElements: number;
  displayedColumns: string[] = ['name','description','quantity'];
  cart = localStorage.getItem(globals.cartId);

  private company :CompanyInterface;


  constructor(private cartService : CartService, 
    public salesOrderService : SalesorderService,
    private toastr: ToastrService,
    private route :ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];          
    });
    this.subscription = this.salesOrderService.currentMessage.subscribe(message => this.showControls = message)      
    if(this.matchExact(location.pathname.split("/").slice(-1)[0], "demo-cart")){
      this.changeShowControls(true)
    }
    //console.log(location.pathname.split("/").slice(-1)[0] + " " + this.showControls);

    this.cartService.getLSCart(this.cart).subscribe((data: ProductInterface[])=>{ 
      this.shopCartItems  = data;
      //console.log(data);
    },
    err =>{
      this.toastr.error("Error cargar productos");  
    }
    ); 
  this.updateOnTheFlyFields();
  // console.log("Result of query");
  // console.log(this.shopCartItems);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onQtyChange(product: ProductInterface, newValue: string){
    
    if(!this.isNumeric(newValue))
      return;

    product.quantity = Number(newValue);
    product.total = product.quantity * product.unitPrice;
    this.cartService.addToLSCart(product, true);
    var cart = localStorage.getItem(globals.cartId);
    let tempCart = this.getCurrentCartFromStorage();
    //get freshly updated cart from local storage
   /*  this.cartService.getLSCart(this.cart).subscribe((data: ProductInterface[])=>{ 
      this.shopCartItems  = data;
    },
    err =>{
      this.toastr.error("Error cargar productos");  
    }
    );  */

    this.shopCartItems = JSON.parse(tempCart || '{}');
    

    this.updateOnTheFlyFields();
  }

  updateOnTheFlyFields(){
    this.numberOfElements = 0;
    this.sumOfCart = 0;

    if(this.shopCartItems == null)
      return;

    if(this.shopCartItems.length > 0){
      this.shopCartItems.forEach(element => {
        this.numberOfElements += 1;        
        element.total = element.quantity * element.unitPrice;
        this.sumOfCart += element.total;
      });
    }
  }

  removeProduct(product: ProductInterface){
    this.cartService.deletePartFromLSCart(product);
    //console.log(JSON.parse(this.cart));

    //get freshly updated cart from local storage
    /*  this.cartService.getLSCart(this.cart).subscribe((data: ProductInterface[])=>{ 
      this.shopCartItems  = data;
      console.log(data);
    },
    err =>{
      this.toastr.error("Error cargar productos");  
    }
    ); */
    let tempCart = this.getCurrentCartFromStorage();
    this.shopCartItems = JSON.parse(tempCart || '{}');
    this.toastr.error("Producto Borrado!");
    this.updateOnTheFlyFields();
  }

  getCurrentCartFromStorage(){
    return localStorage.getItem(globals.cartId) ;

  }

  isNumeric(value: string){
    var convertedNumber = Number(value);
    
    if(convertedNumber == null || isNaN(convertedNumber) )
      return false;
    else
      return true;
  }

  changeShowControls(bl: boolean) {
    this.salesOrderService.changeShowControls(bl)
  }

  matchExact(r, str) {
    var match = str.match(r);
    return match && str === match[0];
 }

}
