import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyFile } from 'src/app/interfaces/company-file';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AddBannerComponent } from '../add-banner/add-banner.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-add-profile-picture',
  templateUrl: './add-profile-picture.component.html',
  styleUrls: ['./add-profile-picture.component.scss']
})
export class AddProfilePictureComponent implements OnInit {

  loading: boolean = false;
  submitted: boolean = false;
  form: FormGroup;
  image_file: string;
  post_data: CompanyFile;
  company: CompanyInterface;

  constructor(
    private bannerService: BannerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddBannerComponent>,
    public companyService: CompanyService,
    public overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      aldanCustomerId: [0],
      companyId: [1],
      companyFileId: [0],
      name: ['PROFILE-PIC'],
      description: [''],
      fileName: [''],
      filePath: [''],
      title: [''],
      subtitle: [''],
      canceledBy: [''],
      canceledDateTime: [''],
      canceled: [false],
      createdBy: [''],
      createdDateTime: [new Date],
      cancelable: [true],
      sysRowId: ['']
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
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.image_file = reader.result;
    this.form.controls.filePath.setValue(this.image_file);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    this.form.controls.createdDateTime.setValue(new Date);
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.bannerService.create(this.form.value).subscribe(res => {
      this.toastr.success("Perfil actualizado correctamente", "Exito");
      this.dialogRef.close();
      window.location.reload();
    },
      error => {
        this.toastr.error("Error", error);
        this.loading = false;
      });
  }
}
