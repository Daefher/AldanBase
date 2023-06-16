import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/services/demo-cart/cart.service';
import { SalesorderService } from 'src/app/services/demo-salesorder/salesorder.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss']
})
export class CartFormComponent {
  //Subscribe to showControls flag
  showControls: boolean;
  subscription: Subscription;
  image_path: string;
  shopCartItems: any = [];
  sumOfCart: number;
  numberOfElements: number;
  displayedColumns: string[] = ['name', 'description', 'quantity'];
  cart = localStorage.getItem(globals.cartId);
  private company: CompanyInterface;
  constructor(private cartService: CartService,
    public salesOrderService: SalesorderService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
      this.image_path = globals.img_path + this.company.companyId + '/';
    });
    this.subscription = this.salesOrderService.currentMessage.subscribe(message => this.showControls = message)
    if (this.matchExact(location.href.split("/").slice(-1)[0], "cart")) {
      this.changeShowControls(true)
    }
    this.cartService.getLSCart(this.cart).subscribe((data: ProductInterface[]) => {
      this.shopCartItems = data;
    },
      err => {
        this.toastr.error("Error cargar productos");
      }
    );
    this.updateOnTheFlyFields();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onQtyChange(product: ProductInterface, newValue: string) {
    if (!this.isNumeric(newValue))
      return;
    product.quantity = Number(newValue);
    product.total = product.quantity * product.unitPrice;
    this.cartService.updateLSCartPart(product, true);
    var cart = localStorage.getItem(globals.cartId);
    let tempCart = this.getCurrentCartFromStorage();  
    this.shopCartItems = JSON.parse(tempCart || '{}');
    this.updateOnTheFlyFields();
  }

  updateOnTheFlyFields() {
    this.numberOfElements = 0;
    this.sumOfCart = 0;
    if (this.shopCartItems == null)
      return;
    if (this.shopCartItems.length > 0) {
      this.shopCartItems.forEach(element => {
        this.numberOfElements += 1;
        element.total = element.quantity * element.unitPrice;
        this.sumOfCart += element.total;
      });
    }
  }

  removeProduct(product: ProductInterface) {
    this.cartService.deletePartFromLSCart(product);  
    let tempCart = this.getCurrentCartFromStorage();
    this.shopCartItems = JSON.parse(tempCart || '{}');
    this.toastr.error("Producto Borrado!");
    this.updateOnTheFlyFields();
  }

  getCurrentCartFromStorage() {
    return localStorage.getItem(globals.cartId);
  }

  isNumeric(value: string) {
    var convertedNumber = Number(value);
    if (convertedNumber == null || isNaN(convertedNumber))
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
