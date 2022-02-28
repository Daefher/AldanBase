import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from '../../../../services/demo-products/products.service';
import { ProductInterface } from '../../../../interfaces/product-interface';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';


import * as globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product_id : any;
  product : ProductInterface; 
  is_login : boolean;

  image_path = globals.img_path;


  constructor(
    private route : ActivatedRoute,
    public productService  : ProductsService,
    //public shoppingCartService: ShoppingcartService,
    private router :  Router,
    private authenticationService : AuthenticationService,
    private toastr: ToastrService,
   
  ) { }

  ngOnInit(): void {

    this.product_id =  this.route.snapshot.params['partId'];

    this.route.params.subscribe(routeParams => {
      this.product_id = routeParams.partId;
     
      
      this.productService.find(this.product_id).subscribe((data)=>{
        this.product = data[0];        
        console.log(this.product);
      },
      err =>{
       
          this.toastr.error(err);
      }
      );
      
    });
  }

}
