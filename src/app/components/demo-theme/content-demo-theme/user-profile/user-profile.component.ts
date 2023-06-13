import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



import * as globals from '../../../../globals';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../services/demo-user/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';
import { UserDataInterface } from '../../../../interfaces/user-data-interface';
import { Observable } from 'rxjs';
import { CompanyInterface } from '../../../../interfaces/company-interface';
import { EditCompanyDialogComponent } from '../dialogs/company/edit-company-dialog/edit-company-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user;
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

    this.authenticationService.currentuser.subscribe(user => this.user = user);

    this.route.data.subscribe((response: any) => {
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
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '320px',
      data: { name: this.name, animal: this.animal },
      panelClass: 'bg-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

    });
  }

  openCompanyDialog(): void {
    const dialogRefCompany = this.dialog.open(EditCompanyDialogComponent, {
      maxWidth: '480px',
      maxHeight: '640px',
      minWidth: "380px",

    });

    dialogRefCompany.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

    });
  }



  receiver(receivedFromChild: any) {
    //console.log(receivedFromChild)
  }


}
