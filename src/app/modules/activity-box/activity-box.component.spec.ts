import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBoxComponent } from './activity-box.component';

describe('ActivityBoxComponent', () => {
  let component: ActivityBoxComponent;
  let fixture: ComponentFixture<ActivityBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
