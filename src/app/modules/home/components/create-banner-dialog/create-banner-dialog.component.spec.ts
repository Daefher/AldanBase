import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBannerDialogComponent } from './create-banner-dialog.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('CreateBannerDialogComponent', () => {
  let component: CreateBannerDialogComponent;
  let fixture: ComponentFixture<CreateBannerDialogComponent>;

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
      declarations: [ CreateBannerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBannerDialogComponent);
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
