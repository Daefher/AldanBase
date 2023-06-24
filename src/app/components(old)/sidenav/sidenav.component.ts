import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/demo-login/authentication.service';
import { UsersService } from 'src/app/services/demo-user/users.service';
import { Observable } from 'rxjs';
import { UserDataInterface } from 'src/app/interfaces/user-data-interface';
import * as globals from '../../globals';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { CompanyInterface } from 'src/app/interfaces/company-interface';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit   {
  image_path :string;
  user : any;
  public user_data$: Observable<UserDataInterface>;
  @Input() company : CompanyInterface;
  company_host_name :  string;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    public usersService : UsersService,
    private companyService: CompanyService

  ) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    this.user_data$ = this.usersService.getCurrentUserInfo;


    if(!this.company){
      this.company_host_name = window.location.hostname;
      this.companyService.getCompanyByHostNameResolver(this.company_host_name).subscribe( data =>{
      //this.companyService.getCompanyByHostNameResolver("aldantech.tk").subscribe( data =>{
        this.company = data[0];    
        this.image_path = globals.img_path +  this.company.companyId +'/'+this.company.name.toLowerCase().replace(/\s/g, '')+'logo.jpg'; 
        //console.log(this.image_path);
      })
    }else{
      this.company = this.company[0];     
      this.image_path = globals.img_path +  this.company.companyId+'/'+this.company.name+'logo.jpg'; 
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
