import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/services/demo-cart/cart.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { ProductsService } from 'src/app/services/demo-products/products.service';
import * as globals from '../../../../globals';
import { ProductQty } from 'src/app/interfaces/product-qty';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {

  product_id: number;
  product: ProductInterface;
  productQty: number;
  is_login: boolean;
  is_loading = true;
  partQty_Value: number;
  partQty_control = 0;
  image_path: string;
  user;
  private company: CompanyInterface;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductsService,
    public cartService: CartService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentuser.subscribe(user => this.user = user);
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
      this.image_path = globals.img_path + this.company.companyId + '/';
    });

    this.product_id = this.route.snapshot.params['partId'];
    this.route.params.subscribe(routeParams => {
      this.product_id = routeParams.partId;
      this.productService.find(this.product_id).subscribe((data: ProductInterface) => {
        this.product = data[0];
        console.log(this.product);
        this.is_loading = false;
      },
        err => {
          this.toastr.error(err);
        }
      );
      this.productService.getPartQty(this.product_id).subscribe((data: ProductQty) => {
        this.productQty = data[0];
        this.partQty_Value = data[0].onHandQty;
      },
        err => {

        });
    });
  }

  cancelProduct(partId) {
    this.productService.delete(partId).subscribe((data) => {
      this.toastr.success("Producto Cancelado Correctamente", "Exito");
    },
      err => {
        this.toastr.error(err);
      }
    );
  }

  adjustQty(partId, event) {
    let data =
    {
      "PartId": partId,
      "Quantity": event.target.value
    };
    this.productService.adjustQty(data).subscribe((response) => {
      this.partQty_Value = this.partQty_Value + parseInt(event.target.value);
      this.toastr.success("Inventario  actualizado correctamente", "Exito");
      this.partQty_control = 0;
    },
      err => {
      });
  }

  updateQty(partId, partQtyId, event) {
    let data =
    {
      "PartQtyId": partQtyId,
      "UomId": 0,
      "PartId": partId,
      "OnHandQty": event.target.value
    };
    this.productService.UpdateQty(data).subscribe((response) => {
      this.partQty_Value = this.partQty_Value + event.target.value;
      this.toastr.success("Inventario  actualizado correctamente", "Exito"); 
      this.partQty_control = 0;
    },
      err => {
      });
  }

  addToCart() {
    this.product.quantity = 1;
    if (this.cartService.addToLSCart(this.product, false))
      this.toastr.success("¡Product agregado exitosamente!");
    else
      this.toastr.error("Hubo un error al agregar el producto");
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
