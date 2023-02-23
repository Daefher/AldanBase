import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import { CompanyPage } from '../../../../../interfaces/CompanyPage/company-page';
import { CompanyPageData } from '../../../../../interfaces/CompanyPage/company-page-data';
import { CompanyService } from '../../../../../services/demo-company/company.service';
import { AuthenticationService } from '../../../../../services/demo-login/authentication.service';
import { DialogData } from '../../../content-demo-theme/dialogs/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-text-form-edit',
  templateUrl: './text-form-edit.component.html',
  styleUrls: ['./text-form-edit.component.scss']
})
export class TextFormEditComponent implements OnInit {

  public post_data : any;
  public block_data_form: FormGroup;

  public CurrentPage: CompanyPage;
  public block;
  submitted = false;
  public user;
  public companyPageData :CompanyPageData;
  public loading_edit = false;

  constructor(public dialogRef: MatDialogRef<TextFormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public companyService : CompanyService,
    public authenticationService : AuthenticationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {

    /* this.companyService.getCompanyPageData(this.data['companyPage'], this.data['block']).subscribe(resp => {
      this.companyPageData =  resp[0];
      this.mapForm(this.companyPageData);
      
    });
    this.initForm(); */
    this.post_data = this.data['companyPageData'];
    this.mapForm(this.data['companyPageData']);
  }

  initForm(){
    this.block_data_form = this.formBuilder.group({     
      
      aldanCustomerId: [''],
      companyId: [''],
      companyPageDataId: [''],
      companyPageId: [''],
      sectionTitle: [''],
      sectionSubtitle: [''],
      sectionDescription: [''],
      sectionPosition: [''],
      canceledBy: [''],
      canceledDateTime: [''],
      canceled: [''],
      createdBy: [''],
      createdDateTime: [''],
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

  onNoClick(): void {
    this.dialogRef.close();    
  }

  get f(){
    return this.block_data_form.controls;
  }

  onSubmit(){
    this.submitted = true;
   
    this.block_data_form.controls.createdDateTime.setValue(new Date);

    // stop here if form is invalid
    if (this.block_data_form.invalid) {
      return;
    }   

    this.loading_edit = true;    
    
    this.companyService.updateCompanyPageData(this.block_data_form.value).subscribe( res => {
      this.toastr.success("Edicion guardada", "Exito");
      this.dialogRef.close();    
      window.location.reload();      
     },
    error => {
      this.toastr.error("Error", error);
      this.loading_edit = false;
    });  

  }

}
