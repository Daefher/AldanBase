import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyInterface } from '../../../interfaces/company-interface';
import { CompanyService } from '../../../services/demo-company/company.service';

@Component({
  selector: 'app-header-demo-theme',
  templateUrl: './header-demo-theme.component.html',
  styleUrls: ['./header-demo-theme.component.scss']
})
export class HeaderDemoThemeComponent implements OnInit {

  public company : CompanyInterface;
  @Input() model:any;
  
  constructor(
    public companyService : CompanyService,
    private activatedRoute: ActivatedRoute
  ) { } 

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
     this.company = response.company[0];     
    });
  }

}
