import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public company : CompanyInterface;


  constructor( public companyService : CompanyService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.company = response.company[0];     
     });
  }

}
