import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/demo-products/products.service';
import { ProductInterface } from '../../../../interfaces/product-interface';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';

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
    public authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getAll(globals.company_id).subscribe((data: ProductInterface[])=>{      
              
      this.products = data;
          
      
    },
    err =>{
      this.toastr.error("Error cargar productos");  
    }
    ); 
  }

}
