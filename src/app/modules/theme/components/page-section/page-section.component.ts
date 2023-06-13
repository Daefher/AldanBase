import { Component, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyPageData } from 'src/app/interfaces/CompanyPage/company-page-data';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { EditPageSectionComponent } from '../edit-page-section/edit-page-section.component';
import { CreatePageSectionComponent } from '../create-page-section/create-page-section.component';
import { UserInterface } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss']
})
export class PageSectionComponent {
  @Input() CurrentPage: any[];
  @Input() Block: number;
  companyPageData: CompanyPageData;
  data_loaded = false;
  user: UserInterface;
  has_class: boolean;
  background_color: string;
  color: string = "#ffffff";
  logs: Array<Array<any>> = [];
  private config: MatDialogConfig = {
    panelClass: "dialog-responsive"
  }
  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,    
  ) { }

  ngOnInit(): void {
    this.background_color = 'background-color : ' + this.color;
    this.authenticationService.currentuser.subscribe((user:UserInterface) => this.user = user);
    if (this.CurrentPage !== undefined && this.Block !== undefined) {
      this.companyService.getCompanyPageData(this.CurrentPage, this.Block).subscribe(resp => {
        this.companyPageData = resp[0];
        this.has_class = this.companyPageData?.sectionCss;
        if (resp.length > 0) this.data_loaded = true;
      })
    }
  }

  public logEvent(event, trigger) {
    this.logs.unshift([this.logs.length + 1, trigger, event]);
    console.log(this.logs);
  }

  editCompanyDialog(): void {
    const dialogRefCompany = this.dialog.open(EditPageSectionComponent, {
      maxWidth: '680px',
      maxHeight: '640px',
      panelClass: "dialog-responsive",
      data: { companyPageData: this.companyPageData, block: this.Block },
    });
    dialogRefCompany.afterClosed().subscribe(result => {

    });
  }

  openCompanyDialog(): void {
    const dialogRefCompany = this.dialog.open(CreatePageSectionComponent, {
      maxWidth: '680px',
      maxHeight: '640px',
      panelClass: "dialog-responsive",
      data: { companyPage: this.CurrentPage, block: this.Block },
    });

    dialogRefCompany.afterClosed().subscribe(result => {

    });
  }

  public deactiveSection(companyPageDataInfo: CompanyPageData): void {
    companyPageDataInfo.canceledDateTime = new Date().toDateString();
    companyPageDataInfo.canceled = !companyPageDataInfo.canceled;
    this.companyService.updateCompanyPageData(companyPageDataInfo).subscribe(resp => {
      if (companyPageDataInfo.canceled)
        this.toastr.success("Seccion Desactivada correctamente", "Exito");
      else
        this.toastr.success("Seccion Activada correctamente", "Exito");
    },
      error => {
        this.toastr.error("Error", error);
      });
  }
  savePageData(pageDataInfo) {
    this.companyService.updateCompanyPageData(pageDataInfo).subscribe(resp => {
      this.toastr.success("Color seleccionado", "Exito");
    },
      error => {
        this.toastr.error("Error", error);
      });
  }
  public changeColor(event, trigger, companyPageDataInfo: CompanyPageData) {
    switch (trigger) {
      case 'BGColor':
        if (companyPageDataInfo.sectionBGColor != event && event != null) {
          companyPageDataInfo.sectionBGColor = event;
          this.savePageData(companyPageDataInfo);
        }
        break;
      case 'FontColor':
        if (companyPageDataInfo.sectionFontColor != event && event != null) {
          companyPageDataInfo.sectionFontColor = event;
          this.savePageData(companyPageDataInfo);
        }
        break;

      default:
        break;
    }
  }
}
