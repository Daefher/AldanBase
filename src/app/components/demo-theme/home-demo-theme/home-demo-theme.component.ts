import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/demo-login/authentication.service';
import { UsersService } from '../../../services/demo-user/users.service';
import { CompanyInterface } from '../../../interfaces/company-interface';
import { BannerComponent } from '../content-demo-theme/dialogs/company/banner/banner.component';
import * as globals from '../../../globals';
import { BannerService } from '../../../services/demo-banner/banner.service';
import { EditBannerComponent } from '../content-demo-theme/dialogs/company/edit-banner/edit-banner.component';
import { CompanyService } from '../../../services/demo-company/company.service';
import { CompanyPage } from '../../../interfaces/CompanyPage/company-page';

@Component({
  selector: 'app-home-demo-theme',
  templateUrl: './home-demo-theme.component.html',
  styleUrls: ['./home-demo-theme.component.scss']
})
export class HomeDemoThemeComponent implements OnInit {

  public company: CompanyInterface;
  public image_banner = {
    image: ""
  };
  public image_id :any;
  public image_path? :string;

  public blocks_map = new Map([
        [0, null],
        [1, null],
        [2, null],
        [3, null]]
      );
  public companyPage : CompanyPage;

  public test :any;
  
  user :any;
  constructor(
    public authenticationService : AuthenticationService,
    public usersService : UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private overlayContainer : OverlayContainer ,
    private bannerService :BannerService,
    private companyService: CompanyService,
  
    

  
  ) { }

  ngOnInit(): void {  

    //this.test = "test";
     
    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];          
      this.image_path = globals.img_path + this.company.companyId +'/';  
      let values = {
        "CompanyId" : this.company.companyId,
        "PageName": "home"
      }
      this.test = values;
      this.companyService.getCompanyPageByCompanyId(values).subscribe(resp => {

        this.companyPage = resp;
        //console.log(this.companyPage);
      })

     });
    
    this.authenticationService.currentuser.subscribe(user => this.user = user);
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);

    this.bannerService.getImage('HOME-BANNER').subscribe(resp => {
      if(resp.length > 0)
        this.image_banner.image = this.image_path + resp[0].fileName;
        this.image_id = resp[0];        
    });  
    
    
  }

  openEditDialog(): void {
    const dialogEditRef = this.dialog.open(EditBannerComponent, {
      width: '330px',     
      panelClass :'bg-dialog'
    });

    dialogEditRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');      
    });
  }

  deleteBanner(id){

    this.bannerService.delete(id).subscribe(response =>{
      this.toastr.success("Banner Borrado", "Exito");
      window.location.reload();

    })
    
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(BannerComponent, {
      width: '350px',        
      panelClass :'bg-dialog-text'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      
    });
  }

}
