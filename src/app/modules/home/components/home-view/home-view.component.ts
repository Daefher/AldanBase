import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import * as globals from '../../../../globals';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CompanyPage } from 'src/app/interfaces/CompanyPage/company-page';
import { CompanyService } from 'src/app/services/demo-company/company.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  company: CompanyInterface;
  companyPage: CompanyPage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    this.activatedRoute.data.subscribe((data: Data) => {
      this.company = data.company[0];
      let values = {
        "CompanyId": this.company.companyId,
        "PageName": "home"
      };
      this.companyService.getCompanyPageByCompanyId(values).subscribe( (resp: CompanyPage) => {
        this.companyPage = resp;
      });
    });
  }

}
