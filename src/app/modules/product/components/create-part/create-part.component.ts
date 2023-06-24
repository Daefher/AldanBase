import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { ProductsService } from 'src/app/services/demo-products/products.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.scss']
})
export class CreatePartComponent {

  createProductForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  image_file: string;
  is_avocado: boolean;
  image_path: string;
  private company: CompanyInterface;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private productService: ProductsService,
    private toastr: ToastrService,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    this.createProductForm = this.formBuilder.group({
      Name: ['', Validators.required],
      UnitPrice: ['', Validators.required],
      PartType: ['Product',],
      UomClassId: ['', 0],
      UomId: ['', 0],
      imageFile: ["",],
      description: ['', Validators.required],
      CreatedDateTime: [new Date],
      UnitCost: ['0', Validators.required],
      weightPerUnit: ['0',],
      category: ['NaN',],
      subCategory: ['NaN',]
    });
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
      this.image_path = globals.img_path + this.company.companyId + '/';
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'product/';
  }

  get f() {
    return this.createProductForm.controls;
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.image_file = reader.result;
    this.createProductForm.controls.imageFile.setValue(this.image_file);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createProductForm.invalid) {
      return;
    }
    this.loading = true;
    this.productService.create(this.createProductForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl + data[0].partId.toString() + '/view'])
          this.toastr.success("Producto creado correctamente", "Exito");
          this.loading = false;
        },
        error => {
          this.toastr.error("Error", error);
          this.loading = false;
        });
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


}
