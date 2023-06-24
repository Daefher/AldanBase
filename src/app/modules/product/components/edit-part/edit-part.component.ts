import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { ProductsService } from 'src/app/services/demo-products/products.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss']
})
export class EditPartComponent {

  product_id: number;
  product: ProductInterface;
  EditProductForm: FormGroup;
  loading: boolean = false;
  form_loading: boolean = true;
  submitted: boolean = false;
  returnUrl: string;
  image_file: string;
  is_avocado: boolean;
  image_path: string;
  private company: CompanyInterface;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private toastr: ToastrService,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    this.buildEditForm();
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];
      this.image_path = globals.img_path + this.company.companyId + '/';
    });
    this.product_id = this.route.snapshot.params['partId'];
    this.productService.find(this.product_id).subscribe((data: ProductInterface) => {
      this.product = data[0];
      this.image_file = this.image_path + this.product.imageFile;
      this.form_loading = false;
      this.EditProductForm.patchValue({
        AldanCustomerId: this.product.aldanCustomerId,
        CompanyId: this.product.companyId,
        PartId: this.product.partId,
        PartNum: this.product.partNum,
        Name: this.product.name,
        Description: this.product.description,
        PayPalToken: this.product.payPalToken,
        CanceledBy: this.product.canceledBy,
        CanceledDateTime: this.product.canceledDateTime,
        Canceled: this.product.canceled,
        CreatedBy: this.product.createdBy,
        CreatedDateTime: this.product.createdDateTime,
        Cancelable: this.product.cancelable,
        UnitPrice: this.product.unitPrice,
        SysRowId: this.product.sysRowId,
        unitCost: this.product.unitCost,
        PartType: this.product.partType,
        UomClassId: this.product.uomClassId,
        UomId: this.product.uomId,
        weightPerUnit: this.product.weightPerUnit,
        WeightUomId: this.product.weightUomId,
        category: this.product.category,
        subCategory: this.product.subcategory
      });
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  buildEditForm() {
    this.EditProductForm = this.formBuilder.group({
      AldanCustomerId: [''],
      CompanyId: [''],
      PartId: [''],
      PartNum: [''],
      Name: ['',],
      Description: ['',],
      PayPalToken: [''],
      CanceledBy: [''],
      CanceledDateTime: [''],
      Canceled: [''],
      CreatedBy: [''],
      CreatedDateTime: [new Date],
      Cancelable: [''],
      UnitPrice: ['',],
      SysRowId: ['',],
      unitCost: [''],
      PartType: ['Product',],
      UomClassId: ['',],
      UomId: ['',],
      weightPerUnit: ['',],
      WeightUomId: ['',],
      imageFile: ["",],
      category: ['',],
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
    this.productService.update(this.product_id, this.EditProductForm.value).subscribe(() => {
      this.toastr.success("Producto actualizado correctamente", "Exito");
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