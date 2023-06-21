import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EditUserDialogComponent, DialogData } from 'src/app/components/demo-theme/content-demo-theme/dialogs/edit-user-dialog/edit-user-dialog.component';
import { UserDataInterface } from 'src/app/interfaces/user-data-interface';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { UsersService } from 'src/app/services/demo-user/users.service';
import * as globals from '../../../../globals';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  post_data: UserDataInterface;
  user_data_form: FormGroup;
  @Output() sender = new EventEmitter();
  user: UserInterface;
  submitted: boolean = false;
  hostname: string = window.location.hostname;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public usersService: UsersService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private overlayContainer: OverlayContainer
  ) {
    this.authenticationService.currentuser.subscribe((user: UserInterface) => this.user = user);
    if (this.user) {
      this.usersService.getUserInfo(this.user.systemUserId).subscribe((data: UserDataInterface[]) => {
        this.post_data = data[0];
      },
        err => {
          this.toastr.error(err);
        }
      );
      globals.chooseTheme(this.hostname, this.overlayContainer);
    }

    this.user_data_form = this.formBuilder.group({
      aldanCustomerId: [''],
      companyId: [''],
      plantId: [''],
      systemUserId: [''],
      systemUserNum: [''],
      profile: [''],
      canceledBy: [''],
      canceledDateTime: [''],
      canceled: [''],
      createdBy: [''],
      createdDateTime: [''],
      cancelable: [''],
      email: [''],
      employeeId: [''],
      isCarrier: [''],
      sysRowId: [''],
      name: [''],
    });
  }

  get f() {
    return this.user_data_form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.usersService.update(this.post_data.systemUserId, this.user_data_form.value).subscribe(res => {
      this.toastr.success("Perfil actualizado correctamente", "Exito");
      this.usersService.setCurrentUserInfo = this.user_data_form.value;
    },
      error => {
        this.toastr.error("Error", error);
      });
    this.dialogRef.close();
  }

  chooseTheme(hostname) {
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
}