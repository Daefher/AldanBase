import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { UserDataInterface } from 'src/app/interfaces/user-data-interface';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { UsersService } from 'src/app/services/demo-user/users.service';
import * as globals from '../../../../globals';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import { CompanyFile } from 'src/app/interfaces/company-file';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() company: CompanyInterface;
  image_path: string;
  user: UserInterface;
  user_data$: Observable<UserDataInterface>;
  company_host_name: string;
  companyFile: CompanyFile;
  image_banner = {
    image: ""
  };

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    public usersService: UsersService,
    private companyService: CompanyService,
    private fileService: BannerService
  ) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe((user: UserInterface) => this.user = user);
    this.user_data$ = this.usersService.getCurrentUserInfo;

    if (!this.company) {
      this.company_host_name = window.location.hostname;
      this.companyService.getCompanyByHostNameResolver(this.company_host_name).subscribe(data => {
        this.company = data[0];
        this.image_path = globals.img_path + this.company.companyId + '/' + this.company.name.toLowerCase().replace(/\s/g, '') + 'logo.jpg';
        
        this.fileService.getImage('PROFILE-PIC').subscribe((bannerFile: CompanyFile[]) => {
          let image_path = globals.img_path + this.company.companyId + '/';
          if (bannerFile.length > 0)
            this.image_banner.image = image_path + bannerFile[0].fileName;
          this.companyFile = bannerFile[0];
        });
        this.image_path = globals.img_path + this.company.companyId + '/' + this.company.name + 'logo.jpg';
      });

    } else {
      this.company = this.company[0];
     
    }
  }

  logout() {
    this.authenticationService.logout();
    //this.is_login = this.authenticationService.loggedIn();
    this.toastr.info("Sesion Cerrada Exitosamente");
    this.router.navigate(['']);
    window.location.reload();

  }

  showFiller = false;
}
