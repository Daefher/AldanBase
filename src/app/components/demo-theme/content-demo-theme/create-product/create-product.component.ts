import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

 
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { ProductsService } from '../../../../services/demo-products/products.service';



import { ToastrService } from 'ngx-toastr';


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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private productService : ProductsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.createProductForm = this.formBuilder.group({
      Name: ['', Validators.required],
      UnitPrice: ['', Validators.required],
      PartType : ['Product', ],
      UomClassId : ['', 0],
      UomId : ['', 0],
      imageFile : ["",],
      description: ['', Validators.required],
      CreatedDateTime : [new Date],
      UnitCost : ['0'],
      weightPerUnit: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['',]
    });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
          this.toastr.success("Producto creado correctamente", "Exito");
          this.router.navigateByUrl("/");
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
