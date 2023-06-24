import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartConfiguration, ChartOptions, ChartEvent } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { CompanyPage } from 'src/app/interfaces/CompanyPage/company-page';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { OrderInterface } from 'src/app/interfaces/order-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { ProductsService } from 'src/app/services/demo-products/products.service';
import { UsersService } from 'src/app/services/demo-user/users.service';
import * as globals from '../../../../globals';
import { activeDemand } from 'src/app/interfaces/active-demand';

@Component({
  selector: 'app-orders-by-product',
  templateUrl: './orders-by-product.component.html',
  styleUrls: ['./orders-by-product.component.scss']
})
export class OrdersByProductComponent {
  @Input() company: CompanyInterface;
  lineChartType: ChartType = 'line';
  private newLabel ?= 'New label';
  products_names: string[] = [];
  products: activeDemand[];
  orders: OrderInterface[];
  products_orders_value = [];
  companyPage: CompanyPage;


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
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 10,
        position: 'left',
        ticks: {
          stepSize: 1,
        }
      }
    }
  };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(public authenticationService: AuthenticationService,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private productService: ProductsService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    this.productService.getActiveDemand(true).subscribe((data: activeDemand[]) => {
      this.products = data;
      for (const prod of data) {
        this.products_names.push(prod.partName);
        this.products_orders_value.push(prod.numberOfOrders);
      }
      this.lineChartData.labels = this.products_names;
      this.lineChartData.datasets[0].data = this.products_orders_value;
      let theme = <ChartOptions>globals.themeCharts(hostname);
      this.themeService.setColorschemesOptions(theme);
      this.chart?.update();
    },
      err => {
        this.toastr.error("Error cargar productos");
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
