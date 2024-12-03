export interface TAcList {
    SERIAL: number;
    ACID: string;
    ACNAME: string;
    PARENT: string;
    TYPE: string;
    OPBAL: string;
    MAPID: string;
    IsBasicAc: number;
    ADDRESS: string;
    PHONE: string;
    FAX: string;
    EMAIL: string;
    VATNO: string;
    GEO: string;
    AREA_ID:any
    PType: string;
    CRLIMIT: number;
    CRPERIOD: number;
    SALEREF: number;
    ACCODE: string;
    LEVELS: number;
    FLGNEW: number;
    COMMON: number;
    PATH: string;
    INITIAL: string;
    EDATE: Date;
    DISMODE: string;
    MCAT: string;
    HASSUBLEDGER: number;
    RATETYPE: number;
    INVCHECK: number;
    LEADTIME: number;
    DUELIMIT: number;
    PRICETAG: number;
    CURRENCY: number;
    ISACTIVE: number;
    MEMID: string;
    PARENTID: string;
    ACTYPE: string;
    DIV: string;
    BANKBUILDING: string;
    BANKACCOUNTnumber: string;
    BANKNAME:string;
    BANKCOSTCENTER: string;
    BANKCODE:string;
    ISCOMMONAC:any;
    ISBRANCH: number;
    DISTRICT:string;
    enableDivSelectionTable:boolean;
    CONTRACTPRICEID: string;
    SALESMANID: number;
    TERMSANDCONDITIONID: number;
    TERMSANDCONDITIONS: string;
    PCL:string;
    
    TITLE: string,
    SHORTNAME: string,
    CUSTOMERID: string,
    CATEGORY: string,
    Currency: string,
    PMODE: string,
    PSTYPE: string,
    GSTTYPE: string,
    MAILTYPE: string,
    TEMPADDRESS: string,
    CITY: string,
    STATE: string,
    AREA: string,
    LANDMARK: string,
    MOBILE: string,
    POSTALCODE: string,
    ADHARNO: string,
    GSTNO: string,
    PRICELEVELCONFIG: string,
    PRICELEVEL: string,
    CTYPE: string,
    ERPPLANTCODE: string
    ERPSTOCKLOCATIONCODE: string;
    CBALANCE: number;
    SUPTYPE: any;
    IS_OVERSEAS_PARTY: number;

    CUS_Remote_Discount: number;
    CUS_FIX_DISCOUNT_PER: number;
    // IsActive:number;
}
export interface SelectedDivisions {
    DIV: string;
}
export interface AcListTree {
    SERIAL: number;
    ACID: number;
    ACNAME: string;
    PARENTID: number;
    TYPE: string;
    isBasicAC: boolean;
    ACCODE: number;
    LEVELS: number;
    PATH: string;
    PARENT: AcListTree;
    PTYPE: string;
    CHILDREN: AcListTree[]
    TEXT: string;
    ANCESTORS: number[]
}
export interface PartyAdditional{
    CNAME: string,
    ONAME: string,
    OCONTACT:string,
    ODESIGNATION: string,
    CONTACTNAME: string,
    CONTACT_A: string,
    CONTACT_B: string,
    CDESIGNATION: string,
    RELATEDSPERSON_A: string,
    RELATEDSPERSON_B: string,
    NOTES: string,
} 

export interface CustomerFilter {
    [key: string]: any
    ImporterTag: string;
    DistributorName: string;
    DistributorCode: string;
    OrgType: string;
    Status: string;

}
export interface SalesTarget{
    BAISHAKH: number,
    JESTHA: number,
    ASHAD: number,
    SHARWAN: number,
    BHADRA: number,
    ASHWIN: number,
    KARTIK: number,
    MANGSHIR: number,
    PAUSH: number,
    MAGH: number,
    FALGUN: number,
    CHAITRA: number,
    TARGET_AMOUNT: number
}