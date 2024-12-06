import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Brand, Model, MultiStockLevel, Product, ProductGroup, TBarcode } from "./ProductItem";
import { Observable, of, Subject } from "rxjs";
import { first, map } from 'rxjs/operators';
import { ConfigService } from "../config.service";
import { MatDialog } from "@angular/material/dialog";
import { GenericDialogComponent } from "../shared/components/generic/generic-dialog/generic-dialog.component";

@Injectable({
    providedIn: 'root',
  })
export class ProductMasterService {
  public searchItemList: any[] = [];
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';
  PBarCodeList: TBarcode[] = [];
  MultiStockList: MultiStockLevel[] = [];
  MCAT_Default!: string;
  productObj: Product = <Product>{};
  pObj: any = <any>{};
  isrowClicked: boolean = false;
  suppilierName: any;
  TempProductObj: any = <any>{}
  treeID:any;
  sortProduct:any;
  sortProductGrp:any;
  selectedGroupMenucode!: string;
  userProfile: any = <any>{};
  activepathurl: any;
  filterParameter:string ='';
  userSetting:any;

  
  constructor(private http: HttpClient,
    public arouter: ActivatedRoute,private configService: ConfigService, public dialog: MatDialog,
    )
    {
      let settings:any = localStorage.getItem('setting');
      this.userSetting = JSON.parse(settings);

    }
    private get apiUrl(): string {
      // let url = this.state.getGlobalSetting("apiUrl");
      let url = this.configService.getApiUrl();
       let apiUrl = "";
   
       if (!!url && url.length > 0) { apiUrl = url };
       return apiUrl
     }

     openSuccessDialog(Message:string) {
      this.dialog.open(GenericDialogComponent, {
        minWidth:'25rem',
        data:{
          Title: "Information",
          Message: Message
        }
      });
    }
    openErrorDialog(Message:string) {
      this.dialog.open(GenericDialogComponent, {
        minWidth:'25rem',
        data:{
          Title: "Error",
          Message: Message
        }
      });
    }
  getParentWiseProduct(BrandName: string) {
    return this.http.get(this.apiUrl + '/getParentWiseProduct/' + BrandName);
  }
  getSearchProducts(searchkey:any) {
    return this.http.get(this.apiUrl + '/getSearchProducts/' + searchkey);
  }
  getProductGroupTree() {
    return this.http.get(this.apiUrl + '/getProductGroupTree');
  }
  getAutoGenerateMenuCode(MGROUP:string,PARENT:string,MCAT = '') {

    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    let newMCAT = encodeURIComponent(MCAT);
    
    this.http.get(this.apiUrl + '/getNewMenucode/' + MGROUP +'/' + PARENT+ '/'+ newMCAT).subscribe(
      (response:any) => {
        let data = response;
        if (data['status'] == 'ok') {
          returnSubject.next(data);
          returnSubject.unsubscribe();

        }
      }
      , error => {
        res.status = 'error'; res.result = error;
        returnSubject.next(res);
        returnSubject.unsubscribe();
      });

    return returnSubject;
  }
  getUniqueMCode() {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getUniqueMcode').subscribe(
      (response:any)=> {
        let data = response;
        if (data['status'] == 'ok') {
          returnSubject.next(data);
          returnSubject.unsubscribe();

        }
      }
      , error => {
        res.status = 'error'; res.result = error;
        returnSubject.next(res);
        returnSubject.unsubscribe();
      });

    return returnSubject;
  }
  getColorGroup() {
    return this.http.get(`${this.apiUrl}/getAllProductColorGroup`);
  }

  public getUnits() {
    return this.http
      .get<any[]>(this.apiUrl + '/getUnits')

  }
  public getPTypeList() {
    return this.http
      .get(this.apiUrl + '/getPType');

  }
  public getMCatList() {
    return this.http
      .get<any[]>(this.apiUrl + '/getMCatList')

  }
  public getMCat1List() {
    return this.http
      .get<any[]>(this.apiUrl + '/getMCat1List')

  }

  public getSalesInfo() {
    return this.http.get(this.apiUrl + `/getDefaultAccountInProductMaster`)
  }

  public getLocationList() {
    return this.http
      .get<any[]>(this.apiUrl + '/getLocationList')

  }

  public saveProduct(
    mode: string,
    prodObj: any,
    RGLIST?: any[],
    AlternateUnits?: any[],
    PBarCodeCollection?: any[],
    BrandModelList?: any[],
    PMultipleRetailPrice?: any[],
    menuItemYields?: any[]
  ) {
    let res = { status: 'error', result: '' };
    let returnSubject: Subject<any> = new Subject();
    let hd: Headers = new Headers({ 'Content-Type': 'application/json' });

    let bodyData = {
      mode: mode,
      data: {
        product: prodObj,
        rglist: RGLIST,
        alternateunits: AlternateUnits,
        bcodeList: PBarCodeCollection,
        bmList: BrandModelList,
        multipleretailpriceList: PMultipleRetailPrice,
        menuItemYields: menuItemYields
      }
    };
    let data = JSON.stringify(bodyData, undefined, 2);
    this.http
      .post(
        this.apiUrl + '/saveProductMaster',
        bodyData

      )
      .subscribe(
        data => {
          let retData:any = data;
          if (retData['status'] === 'ok') {
            res.status = 'ok';
            res.result = retData['result'];
            returnSubject.next(res);
            returnSubject.unsubscribe();
          } else {
            res.status = 'error1';
            res.result = retData['result'];
            returnSubject.next(res);
            returnSubject.unsubscribe();
          }
        },
        error => {
          (res.status = 'error2'), (res.result = error);
          returnSubject.next(res);
          returnSubject.unsubscribe();
        }
      );
    return returnSubject;
  }

  getProduct(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getProduct/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();

      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }
  getProductForEdit(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getProductByMcode/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }


  getProductPriceForView(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getProductPriceByMcode/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }





  getInitialValuesForNewProduct(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getInitialValuesForNewProduct/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();

      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }
  


  saveBrand(brand: Brand) {
    let res = { status: "error", result: "" }
    let returnSubject: Subject<any> = new Subject();
    let bodyData = brand;
    this.http.post(this.apiUrl + "/saveBrand", bodyData)
      .subscribe((data:any)=> {
        let retData = data;
        
        if (retData['status'] == "ok") {
          res.status = "ok";
          res.result = retData['result']
          returnSubject.next(res);
          returnSubject.unsubscribe();
        }
        else {
          res.status = "error1"; res.result = retData['result'];
          
          returnSubject.next(res);
          returnSubject.unsubscribe();
        }
      },
        error => {
          res.status = "error2", res.result = error;
          
          returnSubject.next(res);
          returnSubject.unsubscribe();
        }
      );
    return returnSubject;

  }
  saveModel(model: Model) {
    let res = { status: "error", result: "" }
    let returnSubject: Subject<any> = new Subject();
    let bodyData = model;
    // var  data = JSON.stringify(bodyData, undefined, 2);
    this.http.post(this.apiUrl + "/saveModel", bodyData)
      .subscribe((data:any)=> {
        let retData = data;
        
        if (retData['status'] == "ok") {
          res.status = "ok";
          res.result = retData['result']
          returnSubject.next(res);
          returnSubject.unsubscribe();
        }
        else {
          res.status = "error1"; res.result = retData['result'];
          
          returnSubject.next(res);
          returnSubject.unsubscribe();
        }
      },
        error => {
          res.status = "error2", res.result = error;
          
          returnSubject.next(res);
          returnSubject.unsubscribe();
        }
      );
    return returnSubject;

  }

  getListFromKey(url:string, key:any) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + url + key).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }

  getUploadFile(modal: any) {
    let res = { status: "error", result: "error" }
    let returnSubject: Subject<any> = new Subject();
    let bodyData = modal;
    this.http.post(this.apiUrl + "/SaveImportMenuitemFile", bodyData).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }
  private _ItemList: any[] = [];
  public _ItemListObservable$?: Observable<any[]>;



  getMCATbyId(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getMCATbyId/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();

      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }
  getMCAT1byId(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getMCAT1byId/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();

      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }
  getRecMargin(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getRecMargin/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();

      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }
  getFCodeFromTreeNode(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getFcodeFromTreeNode/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();

      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }
  getECODE(mcode: string, fcode: number) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getMaxECode/' + mcode + '/' + fcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();

      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }

  deleteMenuitem(mcode: string,isGroup : boolean) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/DeleteProductMasterFromMCode/' + mcode +'/' + isGroup).subscribe((response:any)=> {
      let data = response;
      
      if (data['status'] == 'ok') {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    });
    return returnSubject;
  }
  nullToZeroConverter(value:any):number {
    if (
      value === undefined ||
      value == null ||
      value === '' ||
      value === 'Infinity' ||
      value === 'NaN' ||
      isNaN(parseFloat(value))
    ) {
      return 0;
    }
    return parseFloat(value);
  }



  getProductGroupListByID(GroupID: string,ParentID:string,HasChild:number,currentPage:number,maxResultCount:number,sortBy:string='', filters:string ='') {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    
    let url:string = `/getPaginatedProductGroupListByID?ID=${GroupID}&PARENTID=${ParentID}&HASCHILD=${HasChild}&sortBy=${sortBy}&currentPage=${currentPage}&maxResultCount=${maxResultCount}`;

    if(filters){
      url = `/getPaginatedProductGroupListByID?ID=${GroupID}&PARENTID=${ParentID}&HASCHILD=${HasChild}&sortBy=${sortBy}&currentPage=${currentPage}&maxResultCount=${maxResultCount}&filters=${filters}`;
    }


    this.http.get(this.apiUrl + url ).subscribe((response:any)=> {      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }


  getProductListByID(GroupID: string,ParentID:string,HasChild:number,currentPage:number,maxResultCount:number,sortyBy:string='', filters:string ='') {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    
   let url = `/getPaginatedProductListByID?ID=${GroupID}&PARENTID=${ParentID}&HASCHILD=${HasChild}&sortBy=${sortyBy}&currentPage=${currentPage}&maxResultCount=${maxResultCount}`;


   if(filters && filters!="" && filters !=null){
    console.log("filters1",filters);
    url= `/getPaginatedProductListByID?ID=${GroupID}&PARENTID=${ParentID}&HASCHILD=${HasChild}&sortBy=${sortyBy}&currentPage=${currentPage}&maxResultCount=${maxResultCount}&filters=${filters}`
   }

    this.http.get(this.apiUrl + url ).subscribe((response:any)=> {  
    
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }

  getMCODEusingBCODE(BCODE: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    let bodyData = { ID: BCODE };
    this.http.post(this.apiUrl + '/getMCODEusingBCODE', bodyData).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }

  getMCODEusingBARCODE(BCODE: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    let bodyData = { ID: BCODE };
    this.http.get(this.apiUrl + '/getMCODEusingBARCODE/'+BCODE).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }

  getChildrenGrpAndItem(mcode: string) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl + '/getChildrenGrpAndItem/' + mcode).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }

  getProductListByIDandDate(GroupID: string,ParentID:string,HasChild:number,sort:any) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    let bodyData = { ID: GroupID ,PARENTID:ParentID,HASCHILD:HasChild,sort:sort};
    this.http.post(this.apiUrl + '/getProductListByID', bodyData).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }

  getProductGroupListByIDandDate(GroupID: string,ParentID:string,HasChild:number,sort:any) {
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    let bodyData = { ID: GroupID,PARENTID:ParentID,HASCHILD:HasChild,sort:sort };
    this.http.post(this.apiUrl + '/getProductGroupListByID', bodyData).subscribe((response:any)=> {
      let data = response;
      if (data['status'] == 'ok') {
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else {
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error => {
      res.status = 'error'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    }
    );
    return returnSubject;
  }

  public updateBarcodeMapping(voucherno:string) {
    return this.http
      .post(this.apiUrl + '/UpdateBarcodeMapping', voucherno)
  }

  public checkDuplicateBarcode(barcode:string,mcode:string){
    if(mcode == undefined){
      mcode = "null";
    }
    let res = {status: 'error', result: ""};
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl+'/checkDuplicateBarcode/'+barcode+'/'+mcode)
    .subscribe( (response:any)=>{
        let data = response;
        if(data['status'] == 'ok'){
            returnSubject.next(data);
            returnSubject.unsubscribe();
        }else{
            returnSubject.next(data)
            returnSubject.unsubscribe();
        }
    }, error =>{
        res.status = 'error'; res.result = error;
        returnSubject.next(res);
        returnSubject.unsubscribe();
    });
    return returnSubject
  }

  public getMainGroupList(){
    let res = {status: 'error', result: ""};
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl+'/getMainGroupList')
    .subscribe( (response:any)=>{
        let data = response;
        if(data['status'] == 'ok'){
            returnSubject.next(data);
            returnSubject.unsubscribe();
        }else{
            returnSubject.next(data)
            returnSubject.unsubscribe();
        }
    }, error =>{
        res.status = 'error'; res.result = error;
        returnSubject.next(res);
        returnSubject.unsubscribe();
    });
    return returnSubject;
  }

  public getSubGroupList(groupID:string){
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl+'/getSubGroupList?SELECTEDGROUPID='+groupID)
        .subscribe((response:any)=> {
            let data = response;
            if (data['status'] == 'ok') {
                returnSubject.next(data);
                returnSubject.unsubscribe();
            }
            else {
                returnSubject.next(data)
                returnSubject.unsubscribe();
            }
        }, error => {
            res.status = 'error2'; res.result = error;
            returnSubject.next(res);
            returnSubject.unsubscribe();
        }
        );
    return returnSubject;
  }

  public getProductInfo(groupID:string){
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl+'/getProductInfo?GROUPID='+groupID)
        .subscribe((response:any)=> {
            let data = response;
            if (data['status'] == 'ok') {
                returnSubject.next(data);
                returnSubject.unsubscribe();
            }
            else {
                returnSubject.next(data)
                returnSubject.unsubscribe();
            }
        }, error => {
            res.status = 'error2'; res.result = error;
            returnSubject.next(res);
            returnSubject.unsubscribe();
        }
        );
    return returnSubject;
  }

  public getGroupHierarchy(groupID:string){
    let res = {status:"error",result:""};
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl+'/getGroupHierarchy?GROUPID='+groupID)
    .subscribe((response:any)=>{
      let data = response;
      if(data['status']=='ok'){
        returnSubject.next(data);
        returnSubject.unsubscribe();
      }
      else{
        returnSubject.next(data)
        returnSubject.unsubscribe();
      }
    }, error=>{
      res.status = 'error2'; res.result = error;
      returnSubject.next(res);
      returnSubject.unsubscribe();
    });
    return returnSubject;
  }


  
  public checkProductTransaction(groupID:string){
    let res = { status: "error", result: "" };
    let returnSubject: Subject<any> = new Subject();
    this.http.get(this.apiUrl+'/checkProductTransaction?GROUPID='+groupID)
        .subscribe((response:any)=> {
            let data = response;
            if (data['status'] == 'ok') {
                returnSubject.next(data);
                returnSubject.unsubscribe();
            }
            else {
                returnSubject.next(data)
                returnSubject.unsubscribe();
            }
        }, error => {
            res.status = 'error2'; res.result = error;
            returnSubject.next(res);
            returnSubject.unsubscribe();
        }
        );
    return returnSubject;
  }

  validateAltUnitInProductMaster(mcode:string, altunit:string, mode: string) {
    return this.http.get(this.apiUrl + `/ValidateAltUnit?mcode=${mcode}&altunit=${altunit}&mode=${mode}`);
  }

  getKOTCategory(){
    return this.http.get(this.apiUrl + '/getKOTCategory');
  }


}