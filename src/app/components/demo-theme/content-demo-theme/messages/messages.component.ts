import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { CompanyMessage } from 'src/app/interfaces/company-message';
import { CompanyService } from 'src/app/services/demo-company/company.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public company :  CompanyInterface;
  public messages : CompanyMessage[] = [];
  public messages_selected:  CompanyMessage[] = [];

  //Pagination settings
  length: number;
  isLoading = true;
  pageEvent : PageEvent;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 30];
  
  constructor(
    private route: ActivatedRoute,
    private companyService : CompanyService,
    private toastr: ToastrService,

  ){}

  ngOnInit(): void {

    this.route.data.subscribe((response: any) => {
      this.company = response.company[0];    
      this.mapInitializer(this.company.companyId);

    });
    
  }

  mapInitializer(companyId){
    this.companyService.getCompanyMessages(companyId).subscribe((response : any) => {
        
      this.messages =  response;
      console.log(response);
      this.length =this.messages.length;
      this.messages_selected = this.messages.slice(0, this.pageSize) ;
      
    },
    err => {
      this.toastr.error("Error cargar los mensajes");
      this.isLoading = false;
    } );
  }

  getData(event?: PageEvent) {
    //console.log(event);
    if(event){
      this.messages_selected = this.messages.slice(event.pageIndex * event.pageSize,
        event.pageIndex * event.pageSize + event.pageSize);
      return event;
    } else {
      return null;
    }
    
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
