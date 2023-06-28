import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalesComponent } from './dashboard-sales.component';

describe('DashboardSalesComponent', () => {
  let component: DashboardSalesComponent;
  let fixture: ComponentFixture<DashboardSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
