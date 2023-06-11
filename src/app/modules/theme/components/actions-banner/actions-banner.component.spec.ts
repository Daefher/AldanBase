import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsBannerComponent } from './actions-banner.component';

describe('ActionsBannerComponent', () => {
  let component: ActionsBannerComponent;
  let fixture: ComponentFixture<ActionsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
