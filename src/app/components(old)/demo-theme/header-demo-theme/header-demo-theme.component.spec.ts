import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDemoThemeComponent } from './header-demo-theme.component';

describe('HeaderDemoThemeComponent', () => {
  let component: HeaderDemoThemeComponent;
  let fixture: ComponentFixture<HeaderDemoThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDemoThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDemoThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
