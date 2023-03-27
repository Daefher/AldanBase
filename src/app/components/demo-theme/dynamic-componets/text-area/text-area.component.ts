import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyPageData } from '../../../../interfaces/CompanyPage/company-page-data';
import { CompanyService } from '../../../../services/demo-company/company.service';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { TextFormEditComponent } from './text-form-edit/text-form-edit.component';
import { TextFormComponent } from './text-form/text-form.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Input() CurrentPage: any[];
  @Input() Block: number;

  public companyPageData :CompanyPageData;
  public data_loaded = false;
  user :any;
  public has_class : boolean;

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog,
    public authenticationService : AuthenticationService,
    private toastr: ToastrService,
    private renderer: Renderer2


  ) { }

  ngOnInit(): void {

    //let pageData = this.PageData;
    //console.log(this.PageData);
    this.authenticationService.currentuser.subscribe(user => this.user = user);

    if(this.CurrentPage !== undefined && this.Block !== undefined){
      this.companyService.getCompanyPageData(this.CurrentPage, this.Block).subscribe(resp => {
        this.companyPageData =  resp[0];
        this.has_class = this.companyPageData.sectionCss;     
        if(resp.length > 0) this.data_loaded = true;
        console.log(resp);
      })
    }
   


  }

  editCompanyDialog():void {
    const dialogRefCompany = this.dialog.open(TextFormEditComponent, {
      maxWidth: '480px',
      maxHeight: '640px',
      minWidth: "380px",
      data: {companyPageData: this.companyPageData, block: this.Block},
    });

    dialogRefCompany.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      
    });
  }

  openCompanyDialog():void {
    const dialogRefCompany = this.dialog.open(TextFormComponent, {
      maxWidth: '480px',
      maxHeight: '640px',
      minWidth: "380px",
      data: {companyPage: this.CurrentPage, block: this.Block},
    });

    dialogRefCompany.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      
    });
  }

  public deactiveSection(companyPageDataInfo : CompanyPageData):void{
    
    companyPageDataInfo.canceledDateTime = new Date().toDateString();
    companyPageDataInfo.canceled =  !companyPageDataInfo.canceled;

    this.companyService.updateCompanyPageData(companyPageDataInfo).subscribe(resp => {
      if(companyPageDataInfo.canceled)
      this.toastr.success("Seccion Desactivada correctamente", "Exito");
      else 
      this.toastr.success("Seccion Activada correctamente", "Exito");
    },
    error => {
      this.toastr.error("Error", error);
      //this.loading = false;
    });

  }

  public changeColor(companyPageDataInfo : CompanyPageData){

    //this.has_class = !this.has_class;

    companyPageDataInfo.sectionCss = !companyPageDataInfo.sectionCss; 



    this.companyService.updateCompanyPageData(companyPageDataInfo).subscribe(resp => {
    if(companyPageDataInfo.sectionCss)
      this.toastr.success("Color seleccionado", "Exito");     
    },
    error => {
      this.toastr.error("Error", error);
      //this.loading = false;
    });

  }

}
