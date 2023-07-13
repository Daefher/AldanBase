import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePictureComponent } from './edit-profile-picture.component';

describe('EditProfilePictureComponent', () => {
  let component: EditProfilePictureComponent;
  let fixture: ComponentFixture<EditProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilePictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
