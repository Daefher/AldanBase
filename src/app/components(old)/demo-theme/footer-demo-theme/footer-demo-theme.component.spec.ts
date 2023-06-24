import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDemoThemeComponent } from './footer-demo-theme.component';

describe('FooterDemoThemeComponent', () => {
  let component: FooterDemoThemeComponent;
  let fixture: ComponentFixture<FooterDemoThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterDemoThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDemoThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
