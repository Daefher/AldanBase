import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/demo-products/products.service';
import { ProductInterface } from '../../../../interfaces/product-interface';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { CartService } from 'src/app/services/demo-cart/cart.service';

import * as globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feature-products',
  templateUrl: './feature-products.component.html',
  styleUrls: ['./feature-products.component.scss']
})
export class FeatureProductsComponent implements OnInit {
  products: any = [];
  image_path = globals.img_path;

  public user;
  
  constructor(
    private productService : ProductsService, 
    private cartService : CartService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getAll(globals.company_id).subscribe((data: ProductInterface[])=>{      
              
      let temp = this.ReturnNotTrashed(data);
      if(temp.length > 4) {
        console.log(temp);
       
        this.products =  temp.slice(0,4);        
      }else {
        this.products = temp;
      }
          
      
    },
    err =>{
      this.toastr.error("Error cargar productos");  
    }
    ); 
  }

  //DELETE THIS FUNCTION SHOULD BE ON BACKEND
  //Sort only the products that are not trashed
  ReturnNotTrashed(products) {
    let newProducts = [];
    products.forEach(element => {
      if(element.canceled == false){
        newProducts.push(element);
      }
    });

    return newProducts;

    
  }

  addToCart(product: ProductInterface){
    if(this.cartService.addToLSCart(product, false))
      this.toastr.success("¡Product agregado exitosamente!");
    else
      this.toastr.error("Hubo un error al agregar el producto");
  }
}
