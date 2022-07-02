import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/demo-products/products.service';
import { ProductInterface } from '../../../../interfaces/product-interface';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { CartService } from '../../../../services/demo-cart/cart.service';

import * as globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  image_path = globals.img_path;
  filterRslt = [];

  searchForm: any;

  public user;

  constructor(
      private productService : ProductsService, 
      public cartService: CartService,
      public authenticationService: AuthenticationService,
      private toastr: ToastrService,
      private formBuilder: FormBuilder,
     ) { 
      this.searchForm = this.formBuilder.group({
        search: '',
      });
     }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    

    this.productService.getAllActive(globals.company_id).subscribe((data: ProductInterface[])=>{   
      
      
      //let temp =  this.ReturnNotTrashed(data);        
      this.products = data;
      //this.filterRslt = temp;
          
      
    },
    err =>{
      this.toastr.error("Error cargar productos");  
    }
    ); 

   
  }

 /*  getProdut(data:ProductInterface[]){
    let box =  [];
    data.forEach(element => {
       if(element.subcategory == "Solfish-box"){
        box.push(element);
      }       
    });
    return box;
  } */

  filter(status){
    this.filterRslt =  this.products.filter(tur => tur.name === status);
  }
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }  
  
  ReturnNotTrashed(products) {
    let newProducts:any[] = [];
    products.forEach(element => {
      if(element.canceled == false){
        newProducts.push(element);
      }
    });

    return newProducts;

    
  }

  addToCart(product: ProductInterface){
    product.quantity = 1;
    if(this.cartService.addToLSCart(product, false))
      this.toastr.success("¡Product agregado exitosamente!");
    else
      this.toastr.error("Hubo un error al agregar el producto");
  }

}
