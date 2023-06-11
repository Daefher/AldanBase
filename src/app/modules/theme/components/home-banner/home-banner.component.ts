import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyFile } from 'src/app/interfaces/company-file';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { BannerService } from 'src/app/services/demo-banner/banner.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  @Input() companyInfo: CompanyInterface;
  public image_banner = {
    image: ""
  };
  companyFile: CompanyFile;

  constructor(
    private bannerService: BannerService,
    private activatedRoute: ActivatedRoute
  ) { }
 
  ngOnInit(): void {
    console.log(this.companyInfo);
    this.bannerService.getImage('HOME-BANNER').subscribe((bannerFile:CompanyFile[]) => {
      let image_path = globals.img_path + this.companyInfo.companyId + '/';
      if (bannerFile.length > 0)
        this.image_banner.image = image_path + bannerFile[0].fileName;
      this.companyFile = bannerFile[0];      
    });
  }   

}