import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileInfoComponent } from './company-profile-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

fdescribe('CompanyProfileInfoComponent', () => {
  let component: CompanyProfileInfoComponent;
  let fixture: ComponentFixture<CompanyProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule
      ],
      providers: [
        {
          provide: ToastrService, 
          useValue: ToastrService
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ],
      declarations: [CompanyProfileInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
