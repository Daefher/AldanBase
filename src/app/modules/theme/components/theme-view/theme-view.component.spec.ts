import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeViewComponent } from './theme-view.component';

describe('ThemeViewComponent', () => {
  let component: ThemeViewComponent;
  let fixture: ComponentFixture<ThemeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
