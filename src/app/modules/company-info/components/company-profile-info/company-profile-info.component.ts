import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { UserDataInterface } from 'src/app/interfaces/user-data-interface';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { AddProfilePictureComponent } from 'src/app/modules/theme/dialogs/add-profile-picture/add-profile-picture.component';
import { EditCompanyComponent } from 'src/app/modules/theme/dialogs/edit-company/edit-company.component';
import { EditProfileComponent } from 'src/app/modules/theme/dialogs/edit-profile/edit-profile.component';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { UsersService } from 'src/app/services/demo-user/users.service';
import * as globals from '../../../../globals';
import { CompanyFile } from 'src/app/interfaces/company-file';
import { mergeMap, switchMap } from 'rxjs/operators';
import { EditProfilePictureComponent } from 'src/app/modules/theme/dialogs/edit-profile-picture/edit-profile-picture.component';

@Component({
  selector: 'app-company-profile-info',
  templateUrl: './company-profile-info.component.html',
  styleUrls: ['./company-profile-info.component.scss']
})
export class CompanyProfileInfoComponent {

  user: UserInterface;
  user_data$: Observable<UserDataInterface>;
  user_data_temp: UserDataInterface;
  user_created_date: any;
  animal: string;
  name: string;
  companyFile: CompanyFile;
  image_banner = {
    image: ""
  };
  @Input() company: CompanyInterface;
  //protected company: CompanyInterface;

  constructor(
    public authenticationService: AuthenticationService,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fileService : BannerService,
    private cdRef: ChangeDetectorRef,
  ) {   
    this.authenticationService.currentuser.subscribe((user:UserInterface) => this.user = user); 
    this.user_data$ = this.usersService.getCurrentUserInfo;
    this.fileService.getImage('PROFILE-PIC').subscribe((bannerFile: CompanyFile[]) => {
      let image_path = globals.img_path + this.company.companyId + '/';
      if (bannerFile.length > 0)
        this.image_banner.image = image_path + bannerFile[0].fileName + "?ts=" + new Date().getTime();
      this.companyFile = bannerFile[0];
    });
    //console.log("userDATA", this.user_data$);
    /*  if(this.user){
       this.usersService.getUserInfo(this.user.systemUserId).subscribe((data)=>{
         this.user_data = data[0];        
         this.user_created_date = new Date(this.user_data.createdDateTime);
 
         //console.log(this.user_data);
       },
       err =>{
        
           this.toastr.error(err);
       }
       );
     } */
  }

  openProfilePicDialog(): void {
    const dialogRefProfilePic = this.dialog.open(AddProfilePictureComponent, {
      maxWidth: '480px',
      maxHeight: '640px',
      minWidth: "380px",

    });

    dialogRefProfilePic.afterClosed().subscribe(() => {
      //console.log('The dialog was closed');
    });
  }

  openEditProfilePicDialog(): void{
    const dialogRefProfilePic = this.dialog.open(EditProfilePictureComponent, {
      maxWidth: '480px',
      maxHeight: '640px',
      minWidth: "380px",
      data: this.company
    });

    dialogRefProfilePic.afterClosed().subscribe(() => {
      //console.log('The dialog was closed');
      let image_path = globals.img_path + this.company.companyId + '/';      
      this.image_banner.image = image_path + this.companyFile.fileName + "?ts=" + new Date().getTime();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '320px',
      data: { name: this.name, animal: this.animal },
      panelClass: 'bg-dialog'
    });

    dialogRef.afterClosed().subscribe(() => {
      //console.log('The dialog was closed');

    });
  }

  openCompanyDialog(): void {
    const dialogRefCompany = this.dialog.open(EditCompanyComponent, {
      maxWidth: '480px',
      maxHeight: '640px',
      minWidth: "380px",

    });

    dialogRefCompany.afterClosed().subscribe(() => {
      //console.log('The dialog was closed');
    });
  }

  receiver(receivedFromChild: any) {
    //console.log(receivedFromChild)
  }
}