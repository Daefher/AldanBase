import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInfoActiveOnlyComponent } from './sales-info-active-only.component';

describe('SalesInfoActiveOnlyComponent', () => {
  let component: SalesInfoActiveOnlyComponent;
  let fixture: ComponentFixture<SalesInfoActiveOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInfoActiveOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesInfoActiveOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
