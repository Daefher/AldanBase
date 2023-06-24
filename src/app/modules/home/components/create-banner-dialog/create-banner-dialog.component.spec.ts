import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBannerDialogComponent } from './create-banner-dialog.component';

describe('CreateBannerDialogComponent', () => {
  let component: CreateBannerDialogComponent;
  let fixture: ComponentFixture<CreateBannerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBannerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
