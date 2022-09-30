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


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
@Component({
  selector: 'app-admin-products-table',
  templateUrl: './admin-products-table.component.html',
  styleUrls: ['./admin-products-table.component.scss']
})
export class AdminProductsTableComponent implements OnInit {
  user: any;
  products: ProductInterface[] = [];
  toastr: any;
  isLoading = true;

  
  constructor(
    private productService : ProductsService,
    public authenticationService: AuthenticationService,) {}

  displayedColumns: string[] = ['name', 'unitPrice', 'createdDateTime', "actions"];

  dataSource = new MatTableDataSource<ProductInterface>(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    

    this.productService.getAll(globals.company_id).subscribe((data: ProductInterface[])=>{   
      
      
      //let temp =  this.ReturnNotTrashed(data);        
      this.products = data;
      this.dataSource.data = this.products;
      this.isLoading = false;
      //this.filterRslt = temp;
          
      
    },
    err =>{
      this.toastr.error("Error cargar productos");  
    }
    ); 
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
