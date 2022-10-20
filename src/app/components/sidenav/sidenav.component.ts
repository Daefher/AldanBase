import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/demo-login/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit   {

  user : any;

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
    window.location.reload();
   
}

  showFiller = false;

}
