import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BannerComponent } from 'src/app/components/demo-theme/content-demo-theme/dialogs/company/banner/banner.component';
import { CompanyFile } from 'src/app/interfaces/company-file';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import { CompanyService } from 'src/app/services/demo-company/company.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent {

  loading = false;
  submitted = false;
  form: FormGroup;
  image_file: string;
  post_data: CompanyFile;
  company: CompanyInterface;

  constructor(
    private bannerService: BannerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<BannerComponent>,
    public companyService: CompanyService,
  ) { }


  ngOnInit(): void {
    const hostname = window.location.hostname;

    this.bannerService.getImage("BANNER-HOME").subscribe(response => {
      if (response.length > 0) {
        this.mapForm(response[0]);
      }
    }, err => {
      console.log(err);
    }
    )
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
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
    this.form = this.formBuilder.group({
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
      this.toastr.success("Banner actualizado correctamente", "Exito");
      this.dialogRef.close();
      window.location.reload();
    },
      error => {
        this.toastr.error("Error", error);
        this.loading = false;
      });
  }
}
