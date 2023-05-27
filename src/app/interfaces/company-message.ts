export interface CompanyMessage {

    aldanCustomerId: number,
    companyId: number,
    contactMessageId: number,
    name: string,
    email: string,
    message: string,  
    canceledBy: number,
    canceledDateTime: string,
    canceled: boolean,
    createdBy: number,
    createdDateTime: string,
    cancelable: boolean,
    phoneNumber: string
}
