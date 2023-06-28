import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOverallInfoComponent } from './orders-overall-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

fdescribe('OrdersOverallInfoComponent', () => {
  let component: OrdersOverallInfoComponent;
  let fixture: ComponentFixture<OrdersOverallInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(), 
        MatDialogModule       
      ],
      providers: [
        {
          provide: ToastrService, 
          useValue: ToastrService
        },   
        {
          provide: MatDialogRef,
          useValue: {}
        },     
      ],
      declarations: [ OrdersOverallInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersOverallInfoComponent);
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
