import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOverallInfoComponent } from './orders-overall-info.component';

describe('OrdersOverallInfoComponent', () => {
  let component: OrdersOverallInfoComponent;
  let fixture: ComponentFixture<OrdersOverallInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersOverallInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersOverallInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
