import { SalesOrderInterface } from "./sales-order-interface";
import { SalesorderdtlInterface } from "./salesorderdtl-interface";

export interface SalesOrderDatasetInterface {
    links: any;
    lstSalesOrder: SalesOrderInterface[],
    lstSalesOrderDtl: SalesorderdtlInterface[]
}
