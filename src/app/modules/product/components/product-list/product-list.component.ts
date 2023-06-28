import { Component, OnInit } from '@angular/core';


import * as globals from '../../../../globals';

import { OverlayContainer } from '@angular/cdk/overlay';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/services/demo-cart/cart.service';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { ProductsService } from 'src/app/services/demo-products/products.service';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { ProductsSortPipe } from 'src/app/pipes/productsPipes/products-sort.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';

export interface sortInterface  {
  name : string,
  value : string,
  type : string,
  is_date : boolean,

 }
@Component({
  selector: 'app-product-lists',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: ProductInterface[] = [];
  image_path :string ;
  filterRslt:ProductInterface[] = [];
  is_loading: boolean = true;
  sort_types : Array<sortInterface> = [
    { name: 'A-Z', value: 'name' , type: 'asc', is_date: false },
    { name: 'Z-A', value: 'name' , type: 'desc', is_date: false },
    { name: 'Antiguos', value: 'createdDateTime' , type: 'asc', is_date: true },
    { name: 'Nuevos', value: 'createdDateTime' , type: 'desc', is_date: true },
    { name: 'Menor Precio', value: 'unitPrice' , type: 'asc', is_date: false },
    { name: 'Mayor Precio', value: 'unitPrice' , type: 'desc', is_date: false },
  ];
  selected_sort  = { name: 'Nuevos', value: 'createdDateTime' , type: 'desc', is_date: true };
  sort_type : any;
  searchForm: any;
  orderByForm : any;
  user: UserInterface;
  company : CompanyInterface;

  constructor(
      private productService : ProductsService, 
      public cartService: CartService,
      public authenticationService: AuthenticationService,
      private toastr: ToastrService,
      private formBuilder: FormBuilder,
      private companyService : CompanyService,
      private activatedRoute: ActivatedRoute,
      private overlayContainer: OverlayContainer
     ) { 
      this.searchForm = this.formBuilder.group({
        search: '',
      });
     }

  ngOnInit(): void {
    const hostname = window.location.hostname;

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    globals.chooseTheme(hostname, this.overlayContainer);
    this.activatedRoute.data.subscribe((response: any) => {
      this.company = response.company[0];    
      this.mapInitializer(this.company);    
      this.image_path = globals.img_path + this.company?.companyId +'/';  
     });

  }

  mapInitializer(data){
    this.productService.getAllActive(data.companyId).subscribe((data: ProductInterface[])=>{          
      this.products = data;
      this.is_loading = false;     
    },
    err =>{
      this.toastr.error("Error cargar productos"); 
      this.is_loading = false; 
    }
    ); 
  }

  cancelProduct(partId){
    this.productService.delete(partId).subscribe((data) => {
      this.toastr.success("Producto Cancelado Correctamente", "Exito");
      this.products = this.products.filter(item => item.partId != partId);
    },
     err => {
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

  orderByChange(sortInterface :sortInterface){
    //console.log(sortInterface);
    this.updateSortValue(sortInterface);
  }

  updateSortValue(selected_sort){
    this.selected_sort  = selected_sort;
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
