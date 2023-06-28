import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDetailViewComponent } from './orders-detail-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

fdescribe('OrdersDetailViewComponent', () => {
  let component: OrdersDetailViewComponent;
  let fixture: ComponentFixture<OrdersDetailViewComponent>;

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
      declarations: [ OrdersDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDetailViewComponent);
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
