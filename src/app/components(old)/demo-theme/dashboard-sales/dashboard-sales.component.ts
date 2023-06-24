import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import { CompanyInterface } from '../../../interfaces/company-interface';
import { CompanyPage } from '../../../interfaces/CompanyPage/company-page';
import { BannerService } from '../../../services/demo-banner/banner.service';
import { CompanyService } from '../../../services/demo-company/company.service';
import { AuthenticationService } from '../../../services/demo-login/authentication.service';
import { UsersService } from '../../../services/demo-user/users.service';

import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';




@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.scss']
})
export class DashboardSalesComponent implements OnInit {

  public company: CompanyInterface;
  
  public companyPage : CompanyPage;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
     
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
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

  public lineChartType: ChartType = 'line';
  private newLabel? = 'New label';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  constructor(
    public authenticationService : AuthenticationService,
    public usersService : UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private overlayContainer : OverlayContainer ,
    private bannerService :BannerService,
    private companyService: CompanyService,
    
  ) { }

  ngOnInit(): void {
    Chart.register(Annotation)
     
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];          
      let values = {
        "CompanyId" : this.company.companyId,
        "PageName": "home"
      }
      this.companyService.getCompanyPageByCompanyId(values).subscribe(resp => {

        this.companyPage = resp;
        //console.log(this.companyPage);
      })

     });
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
