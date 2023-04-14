import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { OrderInterface } from 'src/app/interfaces/order-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { OrdersService } from 'src/app/services/demo-orders/orders.service';

@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss']
})
export class OrdersInfoComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() company : any;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: 'chartArea',
      },
      
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [  'Activas' ,  'Canceladas' , 'Finalizadas' ],
    datasets: [ {
      label: 'Ordenes',
      backgroundColor:["#EF476F","#FFD166" , "#06D6A0"] ,
      borderColor : ["#ef4763","#ffb066" , "#469670"],
      data: [ ]
    } ]
  };
  public pieChartType: ChartType = 'pie';  
  public orders : OrderInterface[];
  public length : number;

  public orders_canceled: any;
  public orders_canceled_length : number;

  public orders_active : OrderInterface[];
  public orders_active_length : number;

  public orders_finalize : OrderInterface[];
  public orders_finalize_length : number;

  constructor(private ordersService: OrdersService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService   
    ) { }
  ngOnInit(): void { 

    this.ordersService.getAllByDays(this.company.companyId, -800).subscribe((data: OrderInterface[]) => {

      this.orders = data;
      this.length = this.orders.length;

      this.orders_canceled =  data.filter(order => order.canceled == true);
      this.orders_canceled_length = this.orders_canceled.length;
      this.pieChartData.datasets[0].data.push(this.orders_canceled_length);

      this.orders_active =  data.filter(order => order.canceled == false);
      this.orders_active_length = this.orders_active.length;
      this.pieChartData.datasets[0].data.push(this.orders_active_length);

      this.orders_finalize = data.filter(order => order.closed == true);
      this.orders_finalize_length = this.orders_finalize.length;
      this.pieChartData.datasets[0].data.push(this.orders_finalize_length);

    },
      err => {
        this.toastr.error("Error cargar las ordenes");
       
      }
    );
   this.chart?.update();

  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
   // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    //console.log(event, active);
  }
 

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

}
