import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { CartService } from 'src/app/services/demo-cart/cart.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user;
  prods_on_cart: any;
  company: CompanyInterface;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private cart: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentuser.subscribe(user => this.user = user);
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
    });
    /* this.cart.getAmountOnCart().subscribe(value => {
      this.prods_on_cart = value;
    }); */
    this.prods_on_cart = this.cart.getTotalCartProducts;  
    //console.log(this.prods_on_cart?.value) 
  }

  logout() {
    this.authenticationService.logout();
    this.toastr.info("Sesion Cerrada Exitosamente");
    this.router.navigate(['']);
  }
}
