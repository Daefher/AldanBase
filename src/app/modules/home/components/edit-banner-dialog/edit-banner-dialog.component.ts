import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditBannerComponent } from 'src/app/components/demo-theme/content-demo-theme/dialogs/company/edit-banner/edit-banner.component';
import { CompanyFile } from 'src/app/interfaces/company-file';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import * as globals from '../../../../globals';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-edit-banner-dialog',
  templateUrl: './edit-banner-dialog.component.html',
  styleUrls: ['./edit-banner-dialog.component.scss']
})
export class EditBannerDialogComponent implements OnInit {
  loading_edit = false;
  submitted = false;
  public edit_b_form: FormGroup;
  image_file : string;
  post_data : CompanyFile;
  company :CompanyInterface;

  constructor(
    private route : ActivatedRoute,
    private bannerService : BannerService,
    private router : Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditBannerComponent>,
    public companyService : CompanyService,
    public overlayContainer : OverlayContainer
  ) { }

  ngOnInit(): void {

    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    this.bannerService.getImage("HOME-BANNER").subscribe((response:CompanyFile[]) =>{
      if(response.length > 0){
        this.mapForm(response[0]);
        this.post_data = response[0];       
      }   
    },err =>{
      console.log(err);
    }
    )
    this.initForm(); 
  }

  initForm(){
    this.edit_b_form = this.formBuilder.group({           
      aldanCustomerId: [' '],
      companyId: [1],
      companyFileId: [0],
      name: ['HOME-BANNER'],
      description: [' '],
      fileName: [' '],
      filePath: [' '],
      title: [' '],
      subtitle: [' '],
      canceledBy: [''],
      canceledDateTime: [''],
      canceled: [' '],
      createdBy: [' '],
      createdDateTime: [new Date],
      cancelable: [' '],
      sysRowId: [' ']           
    });
  }

  mapForm(file : CompanyFile){
    this.edit_b_form = this.formBuilder.group({ 
      aldanCustomerId: [file?.aldanCustomerId],
      companyId: [file?.companyId],
      companyFileId: [file?.companyFileId],
      name: [file?.name],
      description: [file?.name],
      fileName: [file?.fileName],
      filePath: [file?.filePath],
      title: [file?.title],
      subtitle: [file?.subtitle],
      canceledBy: [file?.canceledBy],
      canceledDateTime: [file?.canceledDateTime],
      canceled: [file?.canceled],
      createdBy: [file?.createdBy],
      createdDateTime: [new Date],
      cancelable: [file?.cancelable],
      sysRowId: [file?.sysRowId]           
    });
  }

  get f(){
    return this.edit_b_form.controls;
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
    this.edit_b_form.controls.filePath.setValue(this.image_file);   
  }

  onNoClick(): void {
    this.dialogRef.close();    
  }

  onSubmit(){
    this.submitted = true;   
    this.edit_b_form.controls.createdDateTime.setValue(new Date);
    if (this.edit_b_form.invalid) {
      return;
    }   
    this.loading_edit = true; 
     this.bannerService.update(this.edit_b_form.value).subscribe( () => {
      this.toastr.success("Banner actualizado correctamente", "Exito");
      this.dialogRef.close();    
      window.location.reload();      
     },
    error => {
      this.toastr.error("Error", error);
      this.loading_edit = false;
    }); 
  }
}
