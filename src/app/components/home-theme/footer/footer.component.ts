import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { AuthenticationService } from '../../../services/demo-login/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public user;
  @Input() company : CompanyInterface;
  constructor(
    
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,


  ) { }

  ngOnInit() {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    //console.log(this.company);
  }

  logout() {
    this.authenticationService.logout();
    //this.is_login = this.authenticationService.loggedIn();
    this.toastr.info("Sesion Cerrada Exitosamente");  
    this.router.navigate(['']);
   
}

}
