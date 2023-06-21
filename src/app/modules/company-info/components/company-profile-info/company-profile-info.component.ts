import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { UserDataInterface } from 'src/app/interfaces/user-data-interface';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { EditCompanyComponent } from 'src/app/modules/theme/dialogs/edit-company/edit-company.component';
import { EditProfileComponent } from 'src/app/modules/theme/dialogs/edit-profile/edit-profile.component';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { UsersService } from 'src/app/services/demo-user/users.service';

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
  protected company: CompanyInterface;

  constructor(
    public authenticationService: AuthenticationService,
    public usersService: UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentuser.subscribe((user:UserInterface) => this.user = user);
    this.route.data.subscribe((response: Data) => {
      this.company = response.company[0];
    });
    this.user_data$ = this.usersService.getCurrentUserInfo;
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