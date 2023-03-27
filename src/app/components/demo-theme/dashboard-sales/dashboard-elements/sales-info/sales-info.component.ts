import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
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
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Productos',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
     
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

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
    ) { }

  ngOnInit(): void {

    this.productService.getAllActive(this.company.companyId).subscribe((data: ProductInterface[])=>{   

      this.products = data;
      for (const prod of data) {
        this.products_names.push(prod.name); 
      }        
      this.lineChartData.labels = this.products_names;
     
      this.chart?.update();

      //this.products_names = data;
      //this.is_loading = false;     
    },
    err =>{
      this.toastr.error("Error cargar productos"); 
      //this.is_loading = false; 
    }
    ); 
    
    this.ordersService.getAll(this.company.companyId).subscribe((data : OrderInterface[]) =>{
      this.orders =  data;
      for (const order of data) {


        
      }
    })

  }

  

   // events
   public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
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
