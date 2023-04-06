export interface OrderInterface {

    aldanCustomerId: number,
    companyId: number,
    plantId: number,
    tfOrderId: number,
    tfOrderNum: string,
    paymentFormNum: string,
    createdBy: number,
    createdDateTime: string,
    canceledBy: number,
    canceledDateTime: string,
    canceled: boolean,
    closed: boolean,
    cancelable: boolean,
    needByDateTime: string,
    toPlantId: number,
    receivedComment: string,
    sysRowId: string,
    carrierId: number
}
