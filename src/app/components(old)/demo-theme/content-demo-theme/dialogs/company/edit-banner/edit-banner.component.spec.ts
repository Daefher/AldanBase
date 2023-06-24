import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannerComponent } from './edit-banner.component';

describe('EditBannerComponent', () => {
  let component: EditBannerComponent;
  let fixture: ComponentFixture<EditBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
