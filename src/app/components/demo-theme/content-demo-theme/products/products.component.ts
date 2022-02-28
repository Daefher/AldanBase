import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/demo-products/products.service';
import { ProductInterface } from '../../../../interfaces/product-interface';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';

import * as globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  image_path = globals.img_path;

  public user;

  constructor( private productService : ProductsService, public authenticationService: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);

    this.productService.getAll(globals.company_id).subscribe((data: ProductInterface[])=>{      
              
      this.products = data;
          
      
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

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }   

}
