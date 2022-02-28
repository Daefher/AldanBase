import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/demo-login/authentication.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-nav-demo-theme',
  templateUrl: './nav-demo-theme.component.html',
  styleUrls: ['./nav-demo-theme.component.scss']
})
export class NavDemoThemeComponent implements OnInit {
  public user;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);

  }

  logout() {
    this.authenticationService.logout();
    //this.is_login = this.authenticationService.loggedIn();
    this.toastr.info("Sesion Cerrada Exitosamente");  
    this.router.navigate(['']);
   
}


}
