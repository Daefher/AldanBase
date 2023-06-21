import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOrdersComponent } from './company-orders.component';

describe('CompanyOrdersComponent', () => {
  let component: CompanyOrdersComponent;
  let fixture: ComponentFixture<CompanyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
