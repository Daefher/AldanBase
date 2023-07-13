import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { UsersService } from 'src/app/services/demo-user/users.service';

@Component({
  selector: 'app-company-info-view',
  templateUrl: './company-info-view.component.html',
  styleUrls: ['./company-info-view.component.scss']
})
export class CompanyInfoViewComponent implements OnInit{


  company: CompanyInterface;
  constructor(
    public authenticationService: AuthenticationService,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fileService : BannerService
    
  ){
  }

  ngOnInit(): void {
    this.route.data.subscribe((response: Data) => {
      this.company = response.company[0];
    });
  }
}
