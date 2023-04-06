import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { CompanyPage } from '../../../../../interfaces/CompanyPage/company-page';
import { OrderInterface } from '../../../../../interfaces/order-interface';
import { ProductInterface } from '../../../../../interfaces/product-interface';
import { AuthenticationService } from '../../../../../services/demo-login/authentication.service';
import { ProductsService } from '../../../../../services/demo-products/products.service';
import { UsersService } from '../../../../../services/demo-user/users.service';



import * as globals from '../../../../../globals';

@Component({
  selector: 'app-sales-info-active-only',
  templateUrl: './sales-info-active-only.component.html',
  styleUrls: ['./sales-info-active-only.component.scss']
})
export class SalesInfoActiveOnlyComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() company : any;
  public barChartType: ChartType = 'bar';
  private newLabel? = 'New label';
  public products_names : any = [];
  protected products :ProductInterface[];
  protected orders : OrderInterface[];
  protected products_orders_value = [];
  public companyPage : CompanyPage;


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
       
      },
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };  

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [ ], 
        label: 'Inventario',
        backgroundColor:["#FFB414", ] 
       },     
      

    ]
  };
  public chartColors: any[] = [
    { 
      
    }];

  constructor( public authenticationService : AuthenticationService,
    public usersService : UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,  
    private productService : ProductsService, 
    private themeService: ThemeService
    ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;

    this.productService.getAllActive(this.company.companyId).subscribe((data: any[])=>{   
      this.products = data;   

      for (const prod of data) {
        this.products_names.push(prod.name); 
        this.products_orders_value.push(prod.onHandQty);
      }      
      this.barChartData.labels = this.products_names;     
      this.barChartData.datasets[0].data = this.products_orders_value;
      let theme = <ChartOptions> globals.themeCharts(hostname);
       
      //this.themeService.setColorschemesOptions(theme);
      this.chart?.update();

    },
    err =>{
      this.toastr.error("Error cargar productos"); 
      //this.is_loading = false; 
    }
    );  

  }

  

   // events
   public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

 
  public changeColor(): void {
    this.barChartData.datasets[2].borderColor = 'green';
    this.barChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.barChartData.datasets[2].label;
    this.barChartData.datasets[2].label = tmp;

    this.chart?.update();
  }
}
