import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderconfirmationComponent } from './orderconfirmation.component';

describe('OrderconfirmationComponent', () => {
  let component: OrderconfirmationComponent;
  let fixture: ComponentFixture<OrderconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderconfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
