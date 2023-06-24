import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';

@Component({
  selector: 'app-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent {
  @Input() company: CompanyInterface;
  user: UserInterface; 
  cpny: CompanyInterface;
  protected company_host_name: string;
  year: number;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    if (!this.company) {
      this.company_host_name = window.location.hostname;
      this.companyService.getCompanyByHostNameResolver(this.company_host_name).subscribe((data: CompanyInterface) => {
        this.cpny = data[0];
      })
    } else {
      this.cpny = this.company[0];
    }
    this.year = new Date().getFullYear();
  }

  logout() {
    this.authenticationService.logout();   
    this.toastr.info("Sesion Cerrada Exitosamente");
    this.router.navigate(['']);

  }
}
