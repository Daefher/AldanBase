import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutViewComponent } from './about-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('AboutViewComponent', () => {
  let component: AboutViewComponent;
  let fixture: ComponentFixture<AboutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ], 
      declarations: [ AboutViewComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AboutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
