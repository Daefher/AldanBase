import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import * as globals from '../../../../globals';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  company: CompanyInterface;

  constructor(
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    globals.chooseTheme(hostname, this.overlayContainer);
    this.activatedRoute.data.subscribe((data: Data) => {
      this.company = data.company[0];      
    });
  }

}
