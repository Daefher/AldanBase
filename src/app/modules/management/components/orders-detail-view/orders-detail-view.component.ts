import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { CompanyPage } from 'src/app/interfaces/CompanyPage/company-page';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { UsersService } from 'src/app/services/demo-user/users.service';

@Component({
  selector: 'app-orders-detail-view',
  templateUrl: './orders-detail-view.component.html',
  styleUrls: ['./orders-detail-view.component.scss']
})
export class OrdersDetailViewComponent implements OnInit {

  company: CompanyInterface;
  companyPage: CompanyPage;

  constructor(
    public authenticationService: AuthenticationService,
    public usersService: UsersService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: Data) => {
      this.company = response.company[0];
      let values = {
        "CompanyId": this.company.companyId,
        "PageName": "home"
      }
      this.companyService.getCompanyPageByCompanyId(values).subscribe((resp: CompanyPage) => {
        this.companyPage = resp;
      })
    });
  }
}
