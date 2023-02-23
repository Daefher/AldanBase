import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as globals from '../../../../globals';
import { CompanyInterface } from '../../../../interfaces/company-interface';
import { CompanyPage } from '../../../../interfaces/CompanyPage/company-page';
import { CompanyService } from '../../../../services/demo-company/company.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public company : CompanyInterface;

  protected values: any;

  public companyPage : CompanyPage;

  public blocks_map = new Map([
    [0, null],]
  );

  @ViewChild('textArea0') textArea0: ElementRef;


  constructor( public companyService : CompanyService,
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);

    this.activatedRoute.data.subscribe((response: any) => {
      this.company = response.company[0];    
      this.values = {
          "CompanyId" : this.company.companyId,
          "PageName": "about"
        }
       
        this.companyService.getCompanyPageByCompanyId(this.values).subscribe(resp => {

          this.companyPage = resp;
          //console.log(this.companyPage);
        })

     });

     
  }

 
}
