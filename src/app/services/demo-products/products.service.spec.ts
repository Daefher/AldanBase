import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,  } from '@angular/common/http/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]

    });     
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: ProductsService = TestBed.inject(ProductsService);
    expect(service.getAll).toBeTruthy();
   });
});
