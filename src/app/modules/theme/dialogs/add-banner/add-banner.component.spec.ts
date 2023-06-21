import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBannerComponent } from './add-banner.component';

describe('AddBannerComponent', () => {
  let component: AddBannerComponent;
  let fixture: ComponentFixture<AddBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
