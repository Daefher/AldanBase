import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartType, ChartConfiguration, ChartData, ChartOptions, ChartEvent } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { CompanyPage } from 'src/app/interfaces/CompanyPage/company-page';
import { OrderInterface } from 'src/app/interfaces/order-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { ProductsService } from 'src/app/services/demo-products/products.service';
import { UsersService } from 'src/app/services/demo-user/users.service';
import * as globals from '../../../../globals';
import { CompanyInterface } from 'src/app/interfaces/company-interface';

@Component({
  selector: 'app-products-available',
  templateUrl: './products-available.component.html',
  styleUrls: ['./products-available.component.scss']
})
export class ProductsAvailableComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() company: CompanyInterface;
  barChartType: ChartType = 'bar';
  companyPage: CompanyPage;
  products_names: string[] = [];
  protected products: ProductInterface[];
  protected orders: OrderInterface[];s
  protected products_orders_value = [];
  private newLabel?= 'New label';  

  barChartOptions: ChartConfiguration['options'] = {
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

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Inventario',
        backgroundColor: ["#FFB414",]
      },


    ]
  };
  chartColors: any[] = [
    {

    }];

  constructor(public authenticationService: AuthenticationService,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private productService: ProductsService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;

    this.productService.getAllActive(this.company?.companyId).subscribe((data: ProductInterface[]) => {
      this.products = data;

      for (const prod of data) {
        this.products_names.push(prod.name);
        this.products_orders_value.push(prod.onHandQty);
      }
      this.barChartData.labels = this.products_names;
      this.barChartData.datasets[0].data = this.products_orders_value;
      let theme = <ChartOptions>globals.themeCharts(hostname);
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