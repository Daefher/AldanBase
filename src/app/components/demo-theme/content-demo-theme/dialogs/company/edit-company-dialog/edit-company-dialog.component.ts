import { Component, OnInit } from '@angular/core';


export interface DialogData {
  email: string;
  name: string;
  //phone : string;


}
@Component({
  selector: 'app-edit-company-dialog',
  templateUrl: './edit-company-dialog.component.html',
  styleUrls: ['./edit-company-dialog.component.scss']
})


export class EditCompanyDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
