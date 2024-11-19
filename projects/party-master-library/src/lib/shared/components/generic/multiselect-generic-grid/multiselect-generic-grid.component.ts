import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../../../config.service';

@Component({
  selector: 'multiselect-generic-grid',
  templateUrl: './multiselect-generic-grid.component.html',
  styleUrls: ['./multiselect-generic-grid.component.css'],
})
export class MultiSelectGenericGridComponent {
  displayedColumns: displayedColumns[] = [];
  columnKeys: string[] = [];

  @Input() popupsettings!: MultiSelectGenericPopUpSettings;
  @Output() onPopUpClose = new EventEmitter();
  dataSource = new MatTableDataSource<any>();
  isActive:boolean=false;
  itemList: any[] = [];
    selectedRowIndex = 0;
  filterValue:string = '';
  filterOption: string = ""; 
  pageSize: number = 10;
  pageNumber: number = 1;
  totalPages: number = 1;
  totalItems!: number;
  requestUrl = '';
  terms:string='';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private configService: ConfigService, private http: HttpClient){}

  ngOnInit(): void {
  }

  private paginatorInitialized = false;

  ngAfterViewChecked(): void {
    if (this.paginator && !this.paginatorInitialized) {
      this.paginator.page.subscribe(event => {
        this.pageNumber = event.pageIndex+1;
        this.pageSize = event.pageSize;
        this.getData();
      });
      this.paginatorInitialized = true;
    }
  }

  private get apiUrl(): string {
    // let url = this.state.getGlobalSetting("apiUrl");
    let url = this.configService.getApiUrl();
     let apiUrl = "";
 
     if (!!url && url.length > 0) { apiUrl = url };
     return apiUrl
   }

  show(){
    this.displayedColumns = [];
    if(this.popupsettings.columns && this.popupsettings.columns.length>0){
      this.popupsettings.columns.forEach((x:any) => {
        const columnTitle = x.title || '';  // Provide default empty string if undefined
        const columnKey = x.key || '';      // Provide default empty string if undefined
        this.displayedColumns.push({ columns: columnTitle, keys: columnKey });
      });
      this.columnKeys = this.displayedColumns.map(c => c.keys!).filter(key => key);
      this.isActive = true;
      this.selectedRowIndex = 0;
      setTimeout(() => {
        this.setFilterOption();
        this.refreshPage();
        this.refresh();
      },0);
    }
  }

  setFilterOption() {
    if (this.popupsettings.columns && this.popupsettings.columns.length>0) {
      const filterIndex = this.popupsettings.defaultFilterIndex ? this.popupsettings.defaultFilterIndex : 0;
      if (this.popupsettings.columns.length <= filterIndex) { return; }

      this.filterValue = '';
      this.filterOption = this.popupsettings.columns[filterIndex].key??'';
    }
  }

  getData() {
    this.selectedRowIndex = 0;
    const apiEndpoints = this.popupsettings.apiEndpoints;
    let apiUrl = `${this.apiUrl}${apiEndpoints}?currentPage=${this.pageNumber}&maxResultCount=${this.pageSize}`;

    this.requestUrl = this.getFilterOption(apiUrl);

    return this.http
      .get(this.requestUrl)
      .subscribe((res:any) => {
        this.totalItems = res.result ? res.result['totalCount'] : 0;


        this.dataSource.data = res.result ? res.result['data'] : res?res['data']:[];
        if(this.popupsettings.title == "Terms And Conditions List"){
          this.dataSource.data.forEach(function (item) {
            if (item.TRNDATE != null && item.TRNDATE !== undefined) {
              item.TRNDATE = item.TRNDATE.toString().substring(0, 10);
            }
            if (item.DATE != null && item.DATE !== undefined) {
              item.DATE = item.DATE.toString().substring(0, 10);
            }
            item.isCheck = false;
            item.isDefault = false;
          });
        }

      });
  }

  getFilterOption(url: string): string {
    let filter = [];
    if (
      this.filterOption == null ||
      this.filterOption == undefined ||
      this.filterOption == ""
    )
      return url;
    if (
      this.filterValue == null ||
      this.filterValue == undefined ||
      this.filterValue == ""
    )
      return url;
    filter.push({ Field: this.filterOption, Value: this.filterValue });
    return `${url}&filters=${JSON.stringify(filter)}`;
  }

  triggerSearch() {
    if (
      this.filterOption == null ||
      this.filterOption === undefined ||
      this.filterOption === ''
    )
      return;
    if (
      this.filterValue == null ||
      this.filterValue === undefined ||
      this.filterValue === ''
    )
      return;

    this.refreshPage();
    this.refresh();
  }
  

  refreshPage() {
    this.pageNumber = 1;
    this.totalPages = 1;
  }

  refresh(): void {
    this.getData();
  }

  onPageChange(value:any) {
    this.pageNumber = value ? value : 1;
    this.refresh();
  }

  onItemClick(data:any){
    this.terms = data.TermsAndConditions;
  }

  close(){
    this.isActive = false;
  }

  onItemClose(){
    let data = this.dataSource.data.filter(x => x.isCheck == true);
    this.onPopUpClose.emit(data);
    this.close();
  }

  onDblClick(event:any){
    this.onPopUpClose.emit(event);
    this.close();
  }
}

export class MultiSelectGenericPopUpSettings {
  title?: string;
  apiEndpoints?: string;
  columns?: ColumnSettings[] = [];
  defaultFilterIndex?= 0;
  showActionButton?= false;
  showIsDefaultSelection?: boolean = false;
}

export class ColumnSettings {
  key?: string;
  title?: string;
  hidden?= false;
  noSearch?= false;
  alignment?:any;
  pipe?:any = false;
}

export class displayedColumns{
  columns?:string;
  keys?:string;
}

