import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from '../../../../services/demo-products/products.service';
import { ProductInterface } from '../../../../interfaces/product-interface';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { CartService } from '../../../../services/demo-cart/cart.service';


import * as globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from '../../../../interfaces/company-interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product_id: any;
  product: ProductInterface;
  productQty: any;
  is_login: boolean;
  is_loading = true;
  partQty_Value : number;
  partQty_control =  0;

  image_path :string;

  public user;

  private company: CompanyInterface;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductsService,
    private router: Router,
    public cartService: CartService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);

    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
      this.image_path = globals.img_path + this.company.companyId +'/';

    });

    this.product_id = this.route.snapshot.params['partId'];

    this.route.params.subscribe(routeParams => {
      this.product_id = routeParams.partId;

      this.productService.find(this.product_id).subscribe((data) => {
        this.product = data[0];
        this.is_loading = false;
        //console.log(this.product);
      },
        err => {

          this.toastr.error(err);
        }
      );

      this.productService.getPartQty(this.product_id).subscribe((data) => {
        this.productQty = data[0];
        this.partQty_Value =  data[0].onHandQty;
      },
        err => {

          //this.toastr.error(err);
        });



    });
  }
  cancelProduct(partId){

    this.productService.delete(partId).subscribe((data) => {
      this.toastr.success("Producto Cancelado Correctamente", "Exito");

    },
     err => {

        this.toastr.error(err);
      }
    );

  }

  adjustQty(partId, event){
    let data =
    {
      "PartId": partId,
      "Quantity": event.target.value
    };

    this.productService.adjustQty(data).subscribe((response) => {

      this.partQty_Value = this.partQty_Value + parseInt(event.target.value);
      //console.log( this.partQty_Value );
      //console.log( event.target.value);
      this.toastr.success("Inventario  actualizado correctamente", "Exito");
      this.partQty_control = 0

    },
      err => {

        //this.toastr.error(err);
      });
  }

  updateQty(partId, partQtyId, event) {
    //console.log(event)
    let data =
    {
      "PartQtyId": partQtyId,
      "UomId": 0,
      "PartId": partId,
      "OnHandQty": event.target.value
      }
      ;
    this.productService.UpdateQty(data).subscribe((response) => {

      this.partQty_Value = this.partQty_Value + event.target.value;


      this.toastr.success("Inventario  actualizado correctamente", "Exito");
      this.partQty_control = 0

    },
      err => {

        //this.toastr.error(err);
      });


  }

  addToCart(){
    this.product.quantity = 1;
    if(this.cartService.addToLSCart( this.product, false))
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

  backButton() {
    this.router.navigate(['/products']);
  }

}
