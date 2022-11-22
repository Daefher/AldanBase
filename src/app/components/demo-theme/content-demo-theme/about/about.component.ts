import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import * as globals from '../../../../globals';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public company : CompanyInterface;


  constructor( public companyService : CompanyService,
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer
    ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);

    this.activatedRoute.data.subscribe((response: any) => {
      this.company = response.company[0];     
     });
  }

}
