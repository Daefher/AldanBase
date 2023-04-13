import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import { CompanyPageData } from '../../../../../interfaces/CompanyPage/company-page-data';
import { CompanyService } from '../../../../../services/demo-company/company.service';
import { AuthenticationService } from '../../../../../services/demo-login/authentication.service';
import {  DialogData } from '../../../content-demo-theme/dialogs/edit-user-dialog/edit-user-dialog.component';
import  * as globals from '../../../../../globals';
import { CompanyPage } from '../../../../../interfaces/CompanyPage/company-page';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent implements OnInit {

  public post_data : any;
  public block_data_form: FormGroup;

  @Output() sender = new EventEmitter();
  public CurrentPage: CompanyPage;
  public block;
  @Input() Block: number;
  submitted = false;
  public user;
  public companyPageData :CompanyPageData;
  public loading_edit = false;


  

  constructor( public dialogRef: MatDialogRef<TextFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public companyService : CompanyService,
    public authenticationService : AuthenticationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    if(this.CurrentPage !== undefined && this.Block !== undefined){
      this.companyService.getCompanyPageData(this.CurrentPage, this.Block).subscribe(resp => {
        this.companyPageData =  resp[0];
        //this.mapForm(this.companyPageData);
        
      });
    }else {
      this.CurrentPage = this.data['companyPage'];
      this.block = this.data['block'];
      console.log(this.CurrentPage);
      this.initForm(this.companyPageData);
    }

  }
  onNoClick(): void {
    this.dialogRef.close();    
  }

  onSubmit(){
    this.submitted = true;
   
    this.block_data_form.controls.createdDateTime.setValue(new Date);

    // stop here if form is invalid
    if (this.block_data_form.invalid) {
      return;
    }   

    this.loading_edit = true;    
    
    this.companyService.createCompanyPageData(this.block_data_form.value).subscribe( res => {
      this.toastr.success("Seccion Creada", "Exito");
      this.dialogRef.close();    
      window.location.reload();      
     },
    error => {
      this.toastr.error("Error", error);
      this.loading_edit = false;
    });  

  }
  initForm(CompanyPage){
    this.block_data_form = this.formBuilder.group({     
      
      aldanCustomerId: [this.CurrentPage.aldanCustomerId],
      companyId: [this.CurrentPage.companyId],
      companyPageDataId: [''],
      companyPageId: [this.CurrentPage.companyPageId],
      sectionTitle: [''],
      sectionSubtitle: [''],
      sectionDescription: [''],
      sectionPosition: [this.block],
      canceledBy: [''],
      canceledDateTime: [''],
      canceled: [''],
      createdBy: [''],
      createdDateTime: [new Date],
      cancelable: [''],
          
    });
  }

  mapForm(PageData : CompanyPageData){
    this.block_data_form = this.formBuilder.group({     
      
      aldanCustomerId: [PageData?.aldanCustomerId],
      companyId: [PageData?.companyId],
      companyPageDataId: [PageData?.companyPageDataId],
      companyPageId: [PageData?.companyPageId],
      sectionTitle: [PageData?.sectionTitle],
      sectionSubtitle: [PageData?.sectionSubtitle],
      sectionDescription: [PageData?.sectionDescription],
      sectionPosition: [PageData?.sectionPosition],
      canceledBy: [PageData?.canceledBy],
      canceledDateTime: [PageData?.canceledDateTime],
      canceled: [PageData?.canceled],
      createdBy: [PageData?.createdBy],
      createdDateTime: [new Date],
      cancelable: [PageData?.cancelable],
    });
  }

  get f(){
    return this.block_data_form.controls;
  }

}
