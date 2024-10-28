import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PartyMasterLibraryService } from '../../../../party-master-library.service';

export interface CustomerVendor {
  CUSTNAME?: string;
  vendorname?: string;
  ADDRESS?: string;
  MOBILENO?: string;
  EMAIL?: string;
  PANNO?: string;
  STATUS:number;
}

export interface ChartOfAccount {
  ACCODE: string;
  groupname: string;
  CUSTNAME: string;
  subledgername: string;
  ACTYPE: string;
  PARENTGROUP: string;
  MAINGROUP: string;
  CATEGORY: string;
  hasmainledger: boolean;
  mainledger: string;
  STATUS:number;
}

const ELEMENT_DATA: CustomerVendor[] = [];

// Sample data for Chart of Accounts
const Chart_Of_Account_Data: ChartOfAccount[] = []

@Component({
  selector: 'lib-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
})
export class GenericTableComponent implements OnInit {

  displayedColumns: string[] = [];
  displayedChartofAccountColumns: string[] = [];
  customerVendorDataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  chartofAccountDataSource = new MatTableDataSource<any>(Chart_Of_Account_Data);
  activeRoute?:string;
  loading:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onItemClick = new EventEmitter();


  constructor(private router: Router, public partyMasterService:PartyMasterLibraryService) {
    const currentRoute = this.router.url;
    this.activeRoute = currentRoute.split('/').pop(); 

  }
  ngOnInit(): void {// Get the last segment of the URL


    this.displayedColumns = [
      'filter',
      'sn',
      ...(this.activeRoute == 'customer' ? ['CUSTNAME'] : []),
      ...(this.activeRoute == 'vendor' ? ['vendorname'] : []),
      'ADDRESS',
      'MOBILENO',
      'EMAIL',
      'PANNO',
      'status',
      'action',
    ];

    this.displayedChartofAccountColumns = [
      'filter',
      'sn',
      ...(this.activeRoute == 'general-ledger' ? ['CUSTNAME'] : []),
      ...(this.activeRoute == 'ledger-group' ? ['groupname'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['subledgername'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['ACCODE'] : []),
      ...(this.activeRoute == 'general-ledger' || this.activeRoute == 'ledger-group' ? ['ACTYPE'] : []),
      ...(this.activeRoute == 'general-ledger' || this.activeRoute == 'ledger-group' ? ['PARENTGROUP'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['MAINGROUP'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['CATEGORY'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['hasmainledger'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['mainledger'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['status'] : []),
      ...(this.activeRoute == 'general-ledger' || this.activeRoute == 'ledger-group' || this.activeRoute == 'sub-ledger'
        ? ['action']
        : []),
    ];
    if(this.activeRoute == 'customer') this.getAllCustomers('C');
    if(this.activeRoute == 'vendor') this.getAllCustomers('V');
    if(this.activeRoute == 'general-ledger') this.getAllCustomers('A');

    
  }
  ngAfterViewInit() {
    if(this.activeRoute == "general-ledger"){
      this.chartofAccountDataSource.paginator = this.paginator;
    }else{
      this.customerVendorDataSource.paginator = this.paginator;
    }
  }

  getAllCustomers(ptype:string){
    this.loading = true;
    this.partyMasterService.getCustomerList(ptype).subscribe((res:any) => {
      if(res.status == "ok"){
        if(this.activeRoute == "general-ledger"){
          this.chartofAccountDataSource.data = res.result;
        }else{
          this.customerVendorDataSource.data = res.result;
        }
      }else if(res.status == "error"){
        this.partyMasterService.openErrorDialog(res.result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.activeRoute == "general-ledger"){
      this.chartofAccountDataSource.filter = filterValue.trim().toLowerCase();
    }else{
      this.customerVendorDataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  navigateToCreateCustomer() {
    this.router.navigate(['/new-customer']);
  }

  onViewClick($event:any){
    this.onItemClick.emit($event);
  }

  navigateToCreateVendor() {
    this.router.navigate(['new-vendor']);
  }

}
