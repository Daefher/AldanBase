import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryViewComponent } from './inventory-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

fdescribe('InventoryViewComponent', () => {
  let component: InventoryViewComponent;
  let fixture: ComponentFixture<InventoryViewComponent>;

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
      declarations: [ InventoryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryViewComponent);
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
