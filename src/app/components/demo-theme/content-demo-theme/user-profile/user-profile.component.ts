import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



import * as globals from '../../../../globals';
import { AuthenticationService } from '../../../../services/demo-login/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../services/demo-user/users.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public user;
  public user_data: any;
  public user_created_date : any;

  animal: string;
  name: string;
  

  constructor(   
     public authenticationService : AuthenticationService,
     public usersService : UsersService,
     private toastr: ToastrService,
     public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.authenticationService.currentuser.subscribe(user => this.user = user);
    if(this.user){
      this.usersService.getUserInfo(this.user.systemUserId).subscribe((data)=>{
        this.user_data = data[0];        
        this.user_created_date = new Date(this.user_data.createdDateTime);

        console.log(this.user_data);
      },
      err =>{
       
          this.toastr.error(err);
      }
      );
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '320px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
