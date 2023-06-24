import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from '../../../interfaces/company-interface';
import { AuthenticationService } from '../../../services/demo-login/authentication.service';
import { CompanyService } from '../../../services/demo-company/company.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public user;
  @Input() company : CompanyInterface;
  public cpny : any;
  protected company_host_name : string;

  public year : number;
  constructor(
    
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private companyService: CompanyService


  ) { }

  ngOnInit() {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    
    
    if(!this.company){
      this.company_host_name = window.location.hostname;
      this.companyService.getCompanyByHostNameResolver(this.company_host_name).subscribe( data =>{
        this.cpny = data[0];     
        //console.log("footer: ",this.cpny);     
      })
    }else{
      this.cpny = this.company[0];
      //console.log("footer: ",this.cpny);
    }

    this.year = new Date().getFullYear();
    
    
  }

  logout() {
    this.authenticationService.logout();
    //this.is_login = this.authenticationService.loggedIn();
    this.toastr.info("Sesion Cerrada Exitosamente");  
    this.router.navigate(['']);
   
}

}
