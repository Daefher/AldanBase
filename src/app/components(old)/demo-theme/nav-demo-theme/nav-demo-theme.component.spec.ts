import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDemoThemeComponent } from './nav-demo-theme.component';

describe('NavDemoThemeComponent', () => {
  let component: NavDemoThemeComponent;
  let fixture: ComponentFixture<NavDemoThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavDemoThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDemoThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
