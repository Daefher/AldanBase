export interface ProductInterface {

    aldanCustomerId: number,
    companyId: number,
    partId: number,
    partNum: string,
    name: string,
    description: string,
    payPalToken: string,
    canceledBy: number,
    canceledDateTime: string,
    canceled: boolean,
    createdBy: number,
    createdDateTime: string,
    cancelable: true,
    unitPrice: number,
    sysRowId: string,
    unitCost: number,
    partType: string,        
    uomClassId: number,
    onHandQty: number,
    uomId: number,
    weightPerUnit : number
    weightUomId : number
    imageFile: string,    
    quantity: number,
    total: number,   
    category: string,
    subcategory: string
}
