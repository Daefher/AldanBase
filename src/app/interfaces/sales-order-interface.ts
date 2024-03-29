export interface SalesOrderInterface {
    CreatedDateTime: string
    Subtotal: number,
    CompanyId: number,
    Taxes: number,
    Total: number,
    Payed: number,
    Change: number,
    CurrencyNum: "MXN",
    PhoneNumber: number,
    PaymentFormNum: string,
    TotalDiscount: number,
    PayPalFullName: string,
    PayPalAddressLine1: string,
    PayPalAddressLine2: string,
    PayPalAdminArea2: string,
    PayPalAdminArea1: string,
    PayPalPostalCode: string,
    PayPalCountryCode: "MX",
    CustomerEmail: string
}
