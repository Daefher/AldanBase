import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDemoThemeComponent } from './home-demo-theme.component';

describe('HomeDemoThemeComponent', () => {
  let component: HomeDemoThemeComponent;
  let fixture: ComponentFixture<HomeDemoThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDemoThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDemoThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
