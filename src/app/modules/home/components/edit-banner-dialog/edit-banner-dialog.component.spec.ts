import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannerDialogComponent } from './edit-banner-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

fdescribe('EditBannerDialogComponent', () => {
  let component: EditBannerDialogComponent;
  let fixture: ComponentFixture<EditBannerDialogComponent>;

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
      declarations: [ EditBannerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBannerDialogComponent);
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
