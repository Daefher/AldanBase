import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../../services/demo-company/company.service';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { first } from 'rxjs/operators';
import { CompanyInterface } from 'src/app/interfaces/company-interface';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm : FormGroup;
  loading = false;
  submitted = false;
  public company :CompanyInterface;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private companyService : CompanyService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];     
      this.contactForm = this.formBuilder.group({     
        name: ['', Validators.required],
        message: ['',Validators.required],
        CompanyId:[this.company.companyId],
        email: ['',Validators.required],
        CreatedDateTime: [new Date],      
        PhoneNumber: ['', Validators.required],        
      });
    });

    

  }

  get f(){
    return this.contactForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }   

    this.loading = true;    

    this.companyService.createContactInfo(this.contactForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success("Mensaje enviado correctamente", "Exito");
          this.router.navigateByUrl("/");
        },
        error => {
          this.toastr.error("Error", error);
          this.loading = false;
        });
  }

}
