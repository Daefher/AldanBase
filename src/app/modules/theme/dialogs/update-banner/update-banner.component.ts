import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyFile } from 'src/app/interfaces/company-file';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrls: ['./update-banner.component.scss']
})
export class UpdateBannerComponent {
  
  loading_edit: boolean = false;
  submitted: boolean = false;
  edit_b_form: FormGroup;
  image_file: string;
  post_data: CompanyFile;
  company: CompanyInterface;

  constructor(
    private bannerService: BannerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<UpdateBannerComponent>,
    public companyService: CompanyService,
    public overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    this.bannerService.getImage("HOME-BANNER").subscribe((response: CompanyFile[]) => {
      if (response.length > 0) {
        this.mapForm(response[0]);
        this.post_data = response[0];        
      }
    }, err => {
      console.log(err);
    }
    )
    this.initForm();
  }

  initForm() {
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

  mapForm(file: CompanyFile) {
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

  get f() {
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
    //console.log(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.image_file = reader.result;
    this.edit_b_form.controls.filePath.setValue(this.image_file);

    //console.log(this.edit_b_form.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    this.edit_b_form.controls.createdDateTime.setValue(new Date);
    // stop here if form is invalid
    if (this.edit_b_form.invalid) {
      return;
    }
    this.loading_edit = true;
    this.bannerService.update(this.edit_b_form.value).subscribe(() => {
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