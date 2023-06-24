import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data } from '@angular/router';
import { ToastrService, OverlayContainer } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { CompanyService } from 'src/app/services/demo-company/company.service';
import { AuthenticationService } from 'src/app/services/demo-login/authentication.service';
import { ProductsService } from 'src/app/services/demo-products/products.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-inventory-products-table',
  templateUrl: './inventory-products-table.component.html',
  styleUrls: ['./inventory-products-table.component.scss']
})
export class InventoryProductsTableComponent {
  cmbOptions: Array<Object>;
  selected:string = 'All';
  user: UserInterface;
  products: ProductInterface[] = [];
  isLoading = true;
  company: CompanyInterface;
  displayedColumns: string[] = ['name', 'unitPrice', 'onHandQty', 'createdDateTime', "actions"];
  dataSource = new MatTableDataSource<ProductInterface>(this.products);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductsService,
    public authenticationService: AuthenticationService,
    public companyService: CompanyService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mapInitializer(data): void {
    this.productService.getAll(data.companyId).subscribe((data: ProductInterface[]) => {
      this.products = data;
      this.products.forEach(prod => {
        prod.createdDateTime = new Date(prod.createdDateTime).toLocaleString();
      });
      this.dataSource.data = this.products;
      this.isLoading = false;
    },
      err => {
        this.toastr.error("Error cargar productos");
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    const hostname = window.location.hostname;
    this.authenticationService.currentuser.subscribe((user:UserInterface) => this.user = user);
    this.activatedRoute.data.subscribe((response: any) => {
      this.mapInitializer(response.company[0]);
    });
    globals.chooseTheme(hostname, this.overlayContainer);
    this.populateInitialCombos();
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  cancelProduct(partId) {
    this.productService.delete(partId).subscribe(() => {
      this.toastr.success("Producto Cancelado Correctamente", "Exito");
      this.products = this.products.filter(item => item.partId != partId);
      this.dataSource.data = this.products;
    },
      err => {
      }
    );
  }

  populateInitialCombos() {
    this.cmbOptions = [
      { id: "All", name: "Todos" },
      { id: "Active", name: "Activos" },
      { id: "Canceled", name: "Cancelados" }
    ];
  }

  onFilterChange(selected: any) {
    switch (selected) {
      case "All":
        this.activatedRoute.data.subscribe((response: Data) => {
          this.mapInitializer(response.company[0]);
        });
        break;
      case "Active":
        this.activatedRoute.data.subscribe((response: Data) => {
          this.productService.getAllActive(response.company[0].companyId).subscribe((data: ProductInterface[]) => {
            this.products = data;
            this.dataSource.data = this.products;
            this.isLoading = false;
          },
            err => {
              this.toastr.error("Error cargar productos");
              this.isLoading = false;
            }
          );
        });
        break;
      case "Canceled":
        this.activatedRoute.data.subscribe((response: Data) => {
          this.productService.getAllCanceled(response.company[0].companyId).subscribe((data: ProductInterface[]) => {
            this.products = data;
            this.dataSource.data = this.products;
            this.isLoading = false;
          },
            err => {
              this.toastr.error("Error cargar productos");
              this.isLoading = false;
            }
          );
        });
        break;
      default:
        this.activatedRoute.data.subscribe((response: Data) => {
          this.mapInitializer(response.company[0]);
        });
        break;
    }
  }

}
