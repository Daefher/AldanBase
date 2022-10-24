import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthenticationService } from '../../../../../services/demo-login/authentication.service';
import { UsersService } from '../../../../../services/demo-user/users.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDataInterface } from '../../../../../interfaces/user-data-interface';
import { Observable } from 'rxjs';



export interface DialogData {
  email: string;
  name: string;
  //phone : string;


}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {

  public post_data : any;
  public user_data_form: FormGroup;

  @Output() sender = new EventEmitter();
  
  public user;
  //public post_data$:  Observable<UserDataInterface>;

  submitted = false;


  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public usersService : UsersService,
    public authenticationService : AuthenticationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,

  ) {
    this.authenticationService.currentuser.subscribe(user => this.user = user);
    //this.post_data$ = this.usersService.getCurrentUserInfo;
    if(this.user){
      this.usersService.getUserInfo(this.user.systemUserId).subscribe((data)=>{
        this.post_data = data[0];
       
        
        //console.log("Post Data",this.post_data);

       
      },
      err =>{       
        this.toastr.error(err);
      }
      ); 
    }

    this.user_data_form = this.formBuilder.group({
      aldanCustomerId: [''],
      companyId:  [''],
      plantId:  [''],
      systemUserId:  [''],
      systemUserNum:  [''],
      profile:  [''],
      password:  [''],
      canceledBy:  [''],
      canceledDateTime:  [''],
      canceled:  [''],
      createdBy:  [''],
      createdDateTime:  [''],
      cancelable:  [''],
      email:  [''],
      employeeId:  [''],
      isCarrier:  [''],
      sysRowId:  [''],
      name:  [''],
    });


  }

  get f() {

    return this.user_data_form.controls;

  }


  onNoClick(): void {
    this.dialogRef.close();    
  }

  onSubmit() :void {

    this.submitted = true;  

    //console.log("Sent FORM",this.user_data_form.value);

    this.usersService.update(this.post_data.systemUserId, this.user_data_form.value).subscribe( res => {
      this.toastr.success("Perfil actualizado correctamente", "Exito");
      let form = this.user_data_form.value;
      this.usersService.setCurrentUserInfo = this.user_data_form.value;
      //this.user_data = this.user_data_form.value;
      
      
      //this.router.navigateByUrl('/product/'+this.product_id + '/view');
      //this.loading = false;
    },
    error => {
      this.toastr.error("Error", error);
      //this.loading = false;
    });
    this.dialogRef.close(); 

  }

}
