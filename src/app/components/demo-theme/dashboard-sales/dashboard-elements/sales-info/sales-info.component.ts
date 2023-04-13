import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import { CompanyInterface } from '../../../../../interfaces/company-interface';
import { CompanyPage } from '../../../../../interfaces/CompanyPage/company-page';
import { OrderInterface } from '../../../../../interfaces/order-interface';
import { ProductInterface } from '../../../../../interfaces/product-interface';
import { BannerService } from '../../../../../services/demo-banner/banner.service';
import { CompanyService } from '../../../../../services/demo-company/company.service';
import { AuthenticationService } from '../../../../../services/demo-login/authentication.service';
import { OrdersService } from '../../../../../services/demo-orders/orders.service';
import { ProductsService } from '../../../../../services/demo-products/products.service';
import { UsersService } from '../../../../../services/demo-user/users.service';

import * as globals from '../../../../../globals';

@Component({
  selector: 'app-sales-info',
  templateUrl: './sales-info.component.html',
  styleUrls: ['./sales-info.component.scss']
})
export class SalesInfoComponent implements OnInit {

  @Input() company : any;
  public lineChartType: ChartType = 'line';
  private newLabel? = 'New label';
  public products_names : any = [];
  protected products :ProductInterface[];
  protected orders : OrderInterface[];
  protected products_orders_value = [];
  public companyPage : CompanyPage;
  

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Productos',
      }
     
    ],
   
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.1
      }
    },
    scales : {
     
      y: {
        beginAtZero : true,
        suggestedMax : 10,
        position: 'left',
        ticks: { 
          stepSize: 1,               
        }
      }
    }

   };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor( public authenticationService : AuthenticationService,
    public usersService : UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private overlayContainer : OverlayContainer ,
    private bannerService :BannerService,
    private companyService: CompanyService,
    private ordersService: OrdersService,
    private productService : ProductsService, 
    private themeService: ThemeService
    ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;

    this.productService.getActiveDemand(true).subscribe((data: any[])=>{   
      this.products = data;
      console.log(data);

      for (const prod of data) {
        this.products_names.push(prod.partName); 
        this.products_orders_value.push(prod.numberOfOrders);
      }      
      this.lineChartData.labels = this.products_names;      
      this.lineChartData.datasets[0].data = this.products_orders_value;
      let theme = <ChartOptions> globals.themeCharts(hostname);
       
      this.themeService.setColorschemesOptions(theme);
      this.chart?.update();

      //this.products_names = data;
      //this.is_loading = false;     
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
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }

}
