import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { TextFormEditComponent } from 'src/app/components/demo-theme/dynamic-componets/text-area/text-form-edit/text-form-edit.component';
import { CompanyPage } from 'src/app/interfaces/CompanyPage/company-page';
import { CompanyPageData } from 'src/app/interfaces/CompanyPage/company-page-data';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';

@Component({
  selector: 'app-edit-page-section',
  templateUrl: './edit-page-section.component.html',
  styleUrls: ['./edit-page-section.component.scss']
})
export class EditPageSectionComponent {
  post_data: any;
  block_data_form: FormGroup;
  CurrentPage: CompanyPage;
  block: number;
  submitted = false;
  user: UserInterface;
  companyPageData: CompanyPageData;
  loading_edit = false;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'fontName',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CompanyPageData,
    public dialogRef: MatDialogRef<EditPageSectionComponent>,    
    public companyService: CompanyService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.post_data = this.data['companyPageData'];
    this.mapForm(this.data['companyPageData']);
  }

  initForm() {
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

  mapForm(PageData: CompanyPageData) {
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

  get f() {
    return this.block_data_form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.block_data_form.controls.createdDateTime.setValue(new Date);
    // stop here if form is invalid
    if (this.block_data_form.invalid) {
      return;
    }
    this.loading_edit = true;
    this.companyService.updateCompanyPageData(this.block_data_form.value).subscribe(res => {
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
