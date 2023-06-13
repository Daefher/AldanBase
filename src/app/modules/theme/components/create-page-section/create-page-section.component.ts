import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { TextFormComponent } from 'src/app/components/demo-theme/dynamic-componets/text-area/text-form/text-form.component';
import { CompanyPage } from 'src/app/interfaces/CompanyPage/company-page';
import { CompanyPageData } from 'src/app/interfaces/CompanyPage/company-page-data';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import * as globals from '../../../../globals';
import { UserInterface } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-create-page-section',
  templateUrl: './create-page-section.component.html',
  styleUrls: ['./create-page-section.component.scss']
})
export class CreatePageSectionComponent {
  @Output() sender = new EventEmitter();
  @Input() Block: number;
  post_data: CompanyPageData;
  block_data_form: FormGroup; 
  CurrentPage: CompanyPage;
  block: unknown;  
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
    public dialogRef: MatDialogRef<CreatePageSectionComponent>,
    public companyService: CompanyService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private overlayContainer: OverlayContainer,
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentuser.subscribe((user:UserInterface) => this.user = user);
    globals.chooseTheme(window.location.hostname, this.overlayContainer);
    if (this.CurrentPage !== undefined && this.Block !== undefined) {
      this.companyService.getCompanyPageData(this.CurrentPage, this.Block).subscribe(resp => {
        this.companyPageData = resp[0];
      });
    } else {
      this.CurrentPage = this.data['companyPage'];
      this.block = this.data['block'];
      this.initForm();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    this.block_data_form.controls.createdDateTime.setValue(new Date);
    // stop here if form is invalid
    if (this.block_data_form.invalid) {
      return;
    }
    this.loading_edit = true;
    this.companyService.createCompanyPageData(this.block_data_form.value).subscribe(res => {
      this.toastr.success("Seccion Creada", "Exito");
      this.dialogRef.close();
      window.location.reload();
    },
      error => {
        this.toastr.error("Error", error);
        this.loading_edit = false;
      });
  }

  initForm() {
    this.block_data_form = this.formBuilder.group({
      aldanCustomerId: [this.CurrentPage?.aldanCustomerId],
      companyId: [this.CurrentPage?.companyId],     
      companyPageId: [this.CurrentPage?.companyPageId],
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

  get f() {
    return this.block_data_form.controls;
  }

}
