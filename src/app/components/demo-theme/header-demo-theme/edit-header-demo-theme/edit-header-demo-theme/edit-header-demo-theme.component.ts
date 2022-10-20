import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BannerInterface } from '../../../../../interfaces/banner-interface';
import { BannerService } from '../../../../../services/demo-banner/banner.service';
@Component({
  selector: 'app-edit-header-demo-theme',
  templateUrl: './edit-header-demo-theme.component.html',
  styleUrls: ['./edit-header-demo-theme.component.scss']
})
export class EditHeaderDemoThemeComponent implements OnInit {

  loading = false;
  submitted = false;
  form: FormGroup;
  image_file : string;
  banner : BannerInterface;
  form_loading = true;


  
  constructor( private route : ActivatedRoute,
    private bannerService : BannerService,
    private router : Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({     
      
      fileBase64: ['', Validators.required],
      name: ['BANNER-HOME',Validators.required],
      description : ['desc'],
      title: ['', Validators.required],
      subtitle : ["",Validators.required], 
     
    });
  }

  get f() {

    return this.form.controls;

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
    this.form.controls.imageFile.setValue(this.image_file);    
    
  }

  onSubmit() {
    this.submitted = true;  
    
    // stop here if form is invalid
    /* if (this.EditProductForm.invalid) {
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
    }); */
  }

}
