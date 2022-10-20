import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from '../../../../interfaces/company-interface';

@Component({
  selector: 'app-demo-login',
  templateUrl: './demo-login.component.html',
  styleUrls: ['./demo-login.component.scss']
})
export class DemoLoginComponent implements OnInit {

  
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  private company :CompanyInterface;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    
    
  ) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/demo']);
    }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.email],
      Password: ['', Validators.required]
    });
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];          
     });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/demo';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.Email.value, this.f.Password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.toastr.success("Sesión Iniciada Exitosamente");  
        },
        error => {
          this.loading = false;
          this.toastr.error("Error al inciar sesión");  
        });
  }
}
