import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutViewComponent } from './checkout-view.component';

describe('CheckoutViewComponent', () => {
  let component: CheckoutViewComponent;
  let fixture: ComponentFixture<CheckoutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
