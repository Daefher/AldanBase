import { Component, Input, OnInit } from '@angular/core';
import { CompanyFile } from 'src/app/interfaces/company-file';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import * as globals from '../../../../globals';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { MatDialog } from '@angular/material/dialog';
import { EditBannerDialogComponent } from 'src/app/modules/home/components/edit-banner-dialog/edit-banner-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CreateBannerDialogComponent } from 'src/app/modules/home/components/create-banner-dialog/create-banner-dialog.component';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  @Input() companyInfo: CompanyInterface;
  image_banner = {
    image: ""
  };
  companyFile: CompanyFile;
  user: UserInterface;
  loading = false;

  constructor(
    private bannerService: BannerService,
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentuser.subscribe(user => this.user = user);
    this.bannerService.getImage('HOME-BANNER').subscribe((bannerFile: CompanyFile[]) => {
      let image_path = globals.img_path + this.companyInfo.companyId + '/';
      if (bannerFile.length > 0)
        this.image_banner.image = image_path + bannerFile[0].fileName;
      this.companyFile = bannerFile[0];
    });
  }

  openEditDialog(): void {
    const dialogEditRef = this.dialog.open(EditBannerDialogComponent, {
      width: '330px',
      panelClass: 'bg-dialog'
    });

    dialogEditRef.afterClosed().subscribe(result => { });
  }

  deleteBanner(id) {

    this.bannerService.delete(id).subscribe(response => {
      this.toastr.success("Banner Borrado", "Exito");
      window.location.reload();

    })

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBannerDialogComponent, {
      width: '350px',
      panelClass: 'bg-dialog-text'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

}