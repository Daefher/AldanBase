import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ProductsService } from '../../../../services/demo-products/products.service';
import { ProductInterface } from '../../../../interfaces/product-interface';
import * as globals from '../../../../globals';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { CompanyInterface } from '../../../../interfaces/company-interface';
import { CompanyService } from '../../../../services/demo-company/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-admin-products-table',
  templateUrl: './admin-products-table.component.html',
  styleUrls: ['./admin-products-table.component.scss']
})
export class AdminProductsTableComponent implements OnInit {
  user: any;
  products: ProductInterface[] = [];
  isLoading = true;

  company : CompanyInterface;


  
  constructor(
    private productService : ProductsService,
    public authenticationService: AuthenticationService,
    public companyService : CompanyService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer
    ) {
    }

  displayedColumns: string[] = ['name', 'unitPrice', 'createdDateTime', "actions"];

  dataSource = new MatTableDataSource<ProductInterface>(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
   
  }

  mapInitializer(data) : void {
    this.productService.getAll(data.companyId).subscribe((data: ProductInterface[])=>{   
        
        
      //let temp =  this.ReturnNotTrashed(data);        
      this.products = data;
      this.dataSource.data = this.products;
      this.isLoading = false;
    },
    err =>{
      this.toastr.error("Error cargar productos");  
      this.isLoading = false;
    }
    ); 
  }

  ngOnInit(): void {
    const hostname = window.location.hostname;

    this.authenticationService.currentuser.subscribe(user => this.user = user);
   
    this.activatedRoute.data.subscribe((response: any) => {
      this.mapInitializer(response.company[0]);     
    });

    globals.chooseTheme(hostname, this.overlayContainer);
  }


  

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  } 

  cancelProduct(partId){

    this.productService.delete(partId).subscribe((data) => {
      this.toastr.success("Producto Cancelado Correctamente", "Exito");
      this.products = this.products.filter(item => item.partId != partId);
      this.dataSource.data = this.products;
    },
     err => {

    }
    );

  }

}
