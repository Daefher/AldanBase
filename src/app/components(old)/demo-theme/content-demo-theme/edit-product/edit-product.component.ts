import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { ProductsService } from '../../../../services/demo-products/products.service';


import { ToastrService } from 'ngx-toastr';
import { ProductInterface } from '../../../../interfaces/product-interface';

import * as globals from '../../../../globals';
import { CompanyInterface } from '../../../../interfaces/company-interface';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {


  product_id : number;
  product : ProductInterface;

  EditProductForm: FormGroup;
  loading = false;
  form_loading = true;
  submitted = false;
  returnUrl: string;
  image_file : string;
  is_avocado : boolean;
  image_path :string;

  private company:CompanyInterface;


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
    this.buildEditForm();


    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];        
      this.image_path = globals.img_path + this.company.companyId +'/';      
  
    });
    
    this.product_id = this.route.snapshot.params['partId'];

    this.productService.find(this.product_id).subscribe((data: ProductInterface)=>{
      this.product = data[0]; 
      this.image_file = this.image_path +this.product.imageFile;
      this.form_loading = false;
      this.EditProductForm.patchValue({
        AldanCustomerId : this.product.aldanCustomerId,       
        CompanyId: this.product.companyId,
        PartId: this.product.partId,
        PartNum: this.product.partNum,
        Name:this.product.name,
        Description: this.product.description,
        PayPalToken: this.product.payPalToken,      
        CanceledBy: this.product.canceledBy,      
        CanceledDateTime: this.product.canceledDateTime,
        Canceled: this.product.canceled,
        CreatedBy: this.product.createdBy,
        CreatedDateTime: this.product.createdDateTime,
        Cancelable: this.product.cancelable,
        UnitPrice: this.product.unitPrice,
        SysRowId : this.product.sysRowId,
        unitCost : this.product.unitCost,
        PartType : this.product.partType,
        UomClassId : this.product.uomClassId,
        UomId : this.product.uomId,
        weightPerUnit: this.product.weightPerUnit,
        WeightUomId: this.product.weightUomId,        
        category: this.product.category,
        subCategory:this.product.subcategory
      });
        
      //this.on_select(this.product.category);
      
    });   

    

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  buildEditForm(){
    this.EditProductForm = this.formBuilder.group({
      AldanCustomerId: [''],
      CompanyId: [''],
      PartId: [''],
      PartNum: [''],
      Name: ['', ],
      Description: ['', ],
      PayPalToken: [''],      
      CanceledBy: [''],      
      CanceledDateTime: [''],
      Canceled: [''],
      CreatedBy: [''],
      CreatedDateTime: [new Date],
      Cancelable: [''],
      UnitPrice: ['', ],
      SysRowId : ['', ],
      unitCost : [''],
      PartType : ['Product', ],
      UomClassId : ['', ],
      UomId : ['', ],
      weightPerUnit: ['', ],
      WeightUomId: ['',],
      imageFile : ["",], 
      category: ['', ],
      subCategory: ['',]
    });
  }

  get f() {

    return this.EditProductForm.controls;

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
    this.EditProductForm.controls.imageFile.setValue(this.image_file);    
    
  }

  onSubmit() {
    this.submitted = true;  
    
    // stop here if form is invalid
    if (this.EditProductForm.invalid) {
      return;
    }   

    this.loading = true;        
    this.productService.update(this.product_id, this.EditProductForm.value).subscribe( res => {
      this.toastr.success("Producto actualizado correctamente", "Exito");
      
      //this.router.navigateByUrl('/product/'+this.product_id + '/view');
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
