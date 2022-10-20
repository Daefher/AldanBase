import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/demo-products/products.service';
import { ProductInterface } from '../../../../interfaces/product-interface';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { CartService } from '../../../../services/demo-cart/cart.service';

import * as globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from '../../../../interfaces/company-interface';
import { CompanyService } from '../../../../services/demo-company/company.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-products',
  templateUrl: './feature-products.component.html',
  styleUrls: ['./feature-products.component.scss']
})
export class FeatureProductsComponent implements OnInit,AfterViewInit {
  products: any = [];
  image_path = globals.img_path;

  company : CompanyInterface;

  public user;
  
  constructor(
    private productService : ProductsService, 
    private cartService : CartService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { 
   
  }

  ngAfterViewInit(): void{
   if(this.company.companyId != undefined){
      this.productService.getAllActive(this.company.companyId).subscribe((data: ProductInterface[])=>{      
        
        //let temp = this.ReturnNotTrashed(data);
        if(data.length > 4) {               
          this.products =  data.slice(0,4);
        }else {
          this.products = data;
        }
            
        
      },
      err =>{
        this.toastr.error("Error cargar feature productos");  
      }
      ); 
    } 

  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((response: any) => {
      this.company = response.company[0];     
      console.log(response.company[0]);
     });
  }

  //DELETE THIS FUNCTION SHOULD BE ON BACKEND
  //Sort only the products that are not trashed
  

  addToCart(product: ProductInterface){
    product.quantity = 1;
    if(this.cartService.addToLSCart(product, false))
      this.toastr.success("¡Product agregado exitosamente!");
    else
      this.toastr.error("Hubo un error al agregar el producto");
  }
}
