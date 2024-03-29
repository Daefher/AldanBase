import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

 
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { ProductsService } from '../../../../services/demo-products/products.service';

import * as globals from '../../../../globals';


import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from '../../../../interfaces/company-interface';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  createProductForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  image_file : string;
  is_avocado : boolean;

  image_path : string;

  private company : CompanyInterface;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private productService : ProductsService,
    private toastr: ToastrService,
    private overlayContainer : OverlayContainer 
    ) { }

  ngOnInit(): void {

    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);

    this.createProductForm = this.formBuilder.group({
      Name: ['', Validators.required],
      UnitPrice: ['', Validators.required],
      PartType : ['Product', ],
      UomClassId : ['', 0],
      UomId : ['', 0],
      imageFile : ["",],
      description: ['', Validators.required],
      CreatedDateTime : [new Date],
      UnitCost : ['0',Validators.required],
      weightPerUnit: ['0', ],
      category: ['NaN', ],
      subCategory: ['NaN',]
    });

    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];     
      this.image_path = globals.img_path + this.company.companyId +'/';      
     
    });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'products/';
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
    //console.log(file);
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
          this.router.navigate([this.returnUrl+ data[0].partId.toString() + '/view'])
          this.toastr.success("Producto creado correctamente", "Exito");
          this.loading = false;
          /* console.log(this.returnUrl+ data[0].partId.toString() + '/view');
          console.log(data); */
          // this.router.navigate([this.returnUrl]);
          //this.router.navigateByUrl('/product/'+data[0].partId+ '/view');
         
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
