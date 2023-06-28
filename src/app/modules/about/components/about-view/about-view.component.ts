import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { CompanyPage } from 'src/app/interfaces/CompanyPage/company-page';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent {

  company: CompanyInterface;
  protected values: unknown;
  companyPage: CompanyPage;
  blocks_map = new Map([
    [0, null],]
  );

  @ViewChild('textArea0') textArea0: ElementRef;

  constructor(
    public companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer,
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    this.activatedRoute.data.subscribe((response: Data) => {
      this.company = response?.company[0];
      try {
        this.values = {
          "CompanyId": this.company?.companyId,
          "PageName": "about"
        }
        this.companyService.getCompanyPageByCompanyId(this.values).subscribe((resp:CompanyPage) => {
          this.companyPage = resp;
        })
      } catch (error) {
        console.log("Cant get comapany id");
      }
      
    });
  }

}
