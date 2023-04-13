import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../../../../services/demo-company/company.service';
import { EditUserDialogComponent } from '../../edit-user-dialog/edit-user-dialog.component';
import { CompanyDialogData } from '../../../../../../interfaces/DialogInterfaces/company-dialog-data';
import { CompanyInterface } from '../../../../../../interfaces/company-interface';
import { ActivatedRoute } from '@angular/router';
import {OverlayContainer} from '@angular/cdk/overlay';
import * as globals from '../../../../../../globals';



@Component({
  selector: 'app-edit-company-dialog',
  templateUrl: './edit-company-dialog.component.html',
  styleUrls: ['./edit-company-dialog.component.scss']
})


export class EditCompanyDialogComponent implements OnInit {

  @Output() sender = new EventEmitter();
  public companyForm: FormGroup;

  public company :CompanyInterface;
  submitted = false;
  public loading = false;



  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    public companyService : CompanyService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private overlayContainer: OverlayContainer
  ) { }


  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);

    this.companyService.getCompanyByHostNameResolver('aldantech.tk').subscribe((response: any) => {
      this.company = response[0];    
      //console.log(response);
      this.mapFormGroup();   
     }); 

     
  
     
     this.mapFormInit();     
     
    }

    chooseTheme(hostname){
      switch (hostname) {
        case "localhost":
        case "aldantech.tk":
          this.overlayContainer.getContainerElement().classList.add("aldantech-theme");
        break;
        case "lamacetita.tk":
          this.overlayContainer.getContainerElement().classList.add("lamacetita-theme");
        default:
          break;
      }
    }

    get f() {

      return this.companyForm.controls;
  
    }

    onNoClick(): void {
      this.dialogRef.close();    
    }
    mapFormInit(){
      this.companyForm = this.formBuilder.group({
        aldanCustomerId: [''],
        companyId:[''],
        companyNum:[''],
        name:[''],
        fileStoragePath:[''],
        imagesPath:[''],
        ftpUserName:[''],
        ftpPassword:[''],
        canceledBy:[''],
        canceledDateTime:[''],
        canceled:[''],
        createdBy:[''],
        createdDateTime:[''],
        cancelable:[''],
        payPalClientId:[''],
        payPalClientSecret:[''],
        payPalPartnerAttrId:[''],
        sysRowId:[''],
        contactEmail:[''],
        smtpServer:[''],
        smtpPort:[''],
        smtpEmail:[''],
        smtpPassword:[''],
        smtpEnableSsl:[''],
        companyWebSite:[''],
        description:[''],
        logoUrl:[''],
        facebookUrl:[''],
        instagramUrl:[''],
        whatsAppUrl:[''],
        twitterUrl:[''],
        youTubeUrl:['']
        })
    }
    mapFormGroup(){
      this.companyForm = this.formBuilder.group({
        aldanCustomerId: [this.company?.aldanCustomerId],
        companyId:[this.company?.companyId],
        companyNum:[this.company?.companyNum],
        name:[this.company?.name],
        fileStoragePath:[this.company?.fileStoragePath],
        imagesPath:[this.company?.imagesPath],
        ftpUserName:[this.company?.ftpUserName],
        ftpPassword:[this.company?.ftpPassword],
        canceledBy:[this.company?.canceledBy],
        canceledDateTime:[this.company?.canceledDateTime],
        canceled:[this.company?.canceled],
        createdBy:[this.company?.createdBy],
        createdDateTime:[this.company?.createdDateTime],
        cancelable:[this.company?.cancelable],
        payPalClientId:[this.company?.payPalClientId],
        payPalClientSecret:[this.company?.payPalClientSecret],
        payPalPartnerAttrId:[this.company?.payPalPartnerAttrId],
        sysRowId:[this.company?.sysRowId],
        contactEmail:[this.company?.contactEmail],
        smtpServer:[this.company?.smtpServer],
        smtpPort:[this.company?.smtpPort],
        smtpEmail:[this.company?.smtpEmail],
        smtpPassword:[this.company?.smtpPassword],
        smtpEnableSsl:[this.company?.smtpEnableSsl],
        companyWebSite:[this.company?.companyWebSite],
        description:[this.company?.description],
        logoUrl:[this.company?.logoUrl],
        facebookUrl:[this.company?.facebookUrl],
        instagramUrl:[this.company?.instagramUrl],
        whatsAppUrl:[this.company?.whatsAppUrl],
        twitterUrl:[this.company?.twitterUrl],
        youTubeUrl:[this.company?.youTubeUrl]
        })

    }

    onSubmit() :void {

      this.submitted = true;  
  
      //console.log("Sent FORM",this.companyForm.value);
  
      this.companyService.update(this.companyForm.value).subscribe( res => {
        this.toastr.success("Perfil actualizado correctamente", "Exito");
        this.loading = false;
        window.location.reload();
        
      },
      error => {
        this.toastr.error("Error", error);
        this.loading = false;
      });
      this.dialogRef.close(); 
  
    }

    
}
