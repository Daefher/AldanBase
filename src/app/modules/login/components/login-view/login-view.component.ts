import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  private company: CompanyInterface;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
    });
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.email],
      Password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.Email.value, this.f.Password.value, this.company.companyId)
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
