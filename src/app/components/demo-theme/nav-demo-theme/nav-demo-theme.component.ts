import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/demo-login/authentication.service';
import { CartService } from '../../../services/demo-cart/cart.service';

import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from '../../../interfaces/company-interface';




@Component({
  selector: 'app-nav-demo-theme',
  templateUrl: './nav-demo-theme.component.html',
  styleUrls: ['./nav-demo-theme.component.scss']
})
export class NavDemoThemeComponent implements OnInit {
  public user;
  public prods_on_cart : any;
  private company : CompanyInterface;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private cart : CartService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];          
    });
    this.cart.getAmountOnCart().subscribe(value => {    
      this.prods_on_cart = value;
    } );

  }

  logout() {
    this.authenticationService.logout();
    //this.is_login = this.authenticationService.loggedIn();
    this.toastr.info("Sesion Cerrada Exitosamente");  
    this.router.navigate(['']);
   
}


}
