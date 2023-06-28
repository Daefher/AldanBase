import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationViewComponent } from './order-confirmation-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

fdescribe('OrderConfirmationViewComponent', () => {
  let component: OrderConfirmationViewComponent;
  let fixture: ComponentFixture<OrderConfirmationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        {provide: ToastrService, useValue: ToastrService}
      ],
      declarations: [ OrderConfirmationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationViewComponent);
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
