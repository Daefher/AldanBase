import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/demo-login/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public user;

  constructor(
    
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,


  ) { }

  ngOnInit() {

    this.authenticationService.currentuser.subscribe(user => this.user = user);

  }

  logout() {
    this.authenticationService.logout();
    //this.is_login = this.authenticationService.loggedIn();
    this.toastr.info("Sesion Cerrada Exitosamente");  
    this.router.navigate(['']);
   
}

}
