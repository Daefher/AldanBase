import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyInterface } from '../../../interfaces/company-interface';

@Component({
  selector: 'app-home-demo-theme',
  templateUrl: './home-demo-theme.component.html',
  styleUrls: ['./home-demo-theme.component.scss']
})
export class HomeDemoThemeComponent implements OnInit {

  public company: CompanyInterface;

  constructor(
  
  ) { }

  ngOnInit(): void {

   
  }

}
