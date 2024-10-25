import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PartyMasterLibraryService } from '../../../../party-master-library.service';

export interface CustomerVendor {
  sn?: number;
  CUSTNAME?: string;
  vendorname?: string;
  ADDRESS?: string;
  MOBILENO?: string;
  EMAIL?: string;
  PANNO?: string;
}

export interface ChartOfAccount {
  sn: number;
  accountcode: string;
  groupname: string;
  accountname: string;
  subledgername: string;
  accounttype: string;
  parentgroup: string;
  maingroup: string;
  category: string;
  hasmainledger: boolean;
  mainledger: string;
}

const ELEMENT_DATA: CustomerVendor[] = [];

// Sample data for Chart of Accounts
const Chart_Of_Account_Data: ChartOfAccount[] = [
  {
    sn: 1,
    accountcode: '1000',
    groupname: 'Rajesh',
    accountname: 'Cash',
    subledgername: 'Suresh Dangol',
    accounttype: 'Asset',
    parentgroup: 'Current Assets',
    maingroup: 'Assets',
    category: 'Liquid',
    hasmainledger: true,
    mainledger: 'Cash Ledger',
  },
  {
    sn: 2,
    accountcode: '1001',
    groupname: 'Rajesh',
    accountname: 'Accounts Receivable',
    subledgername: 'Suresh Dangol',
    accounttype: 'Asset',
    parentgroup: 'Current Assets',
    maingroup: 'Assets',
    category: 'Receivable',
    hasmainledger: true,
    mainledger: 'Receivables Ledger',
  },
  {
    sn: 3,
    accountcode: '2000',
    groupname: 'Rajesh',
    accountname: 'Accounts Payable',
    subledgername: 'Suresh Dangol',
    accounttype: 'Liability',
    parentgroup: 'Current Liabilities',
    maingroup: 'Liabilities',
    category: 'Payable',
    hasmainledger: true,
    mainledger: 'Payables Ledger',
  },
  {
    sn: 4,
    accountcode: '1002',
    groupname: 'Rajesh',
    accountname: 'Inventory',
    subledgername: 'Suresh Dangol',
    accounttype: 'Asset',
    parentgroup: 'Current Assets',
    maingroup: 'Assets',
    category: 'Stock',
    hasmainledger: false,
    mainledger: 'Payable',
  },
  {
    sn: 5,
    accountcode: '3000',
    groupname: 'Rajesh',
    accountname: 'Equity',
    subledgername: 'Suresh Dangol',
    accounttype: 'Equity',
    parentgroup: 'Owner’s Equity',
    maingroup: 'Equity',
    category: 'Capital',
    hasmainledger: true,
    mainledger: 'Equity Ledger',
  },
  {
    sn: 6,
    accountcode: '4000',
    groupname: 'Rajesh',
    accountname: 'Sales Revenue',
    subledgername: 'Suresh Dangol',
    accounttype: 'Revenue',
    parentgroup: 'Revenue',
    maingroup: 'Income',
    category: 'Sales',
    hasmainledger: true,
    mainledger: 'Sales Ledger',
  },
  {
    sn: 7,
    accountcode: '5000',
    groupname: 'Rajesh',
    accountname: 'Cost of Goods Sold',
    subledgername: 'Suresh Dangol',
    accounttype: 'Expense',
    parentgroup: 'Cost of Sales',
    maingroup: 'Expenses',
    category: 'Direct Expense',
    hasmainledger: true,
    mainledger: 'COGS Ledger',
  },
  {
    sn: 8,
    accountcode: '5001',
    groupname: 'Rajesh',
    accountname: 'Rent Expense',
    subledgername: 'Suresh Dangol',
    accounttype: 'Expense',
    parentgroup: 'Operating Expenses',
    maingroup: 'Expenses',
    category: 'Overhead',
    hasmainledger: true,
    mainledger: 'Rent Ledger',
  },
  {
    sn: 9,
    accountcode: '4001',
    groupname: 'Rajesh',
    accountname: 'Interest Income',
    subledgername: 'Suresh Dangol',
    accounttype: 'Revenue',
    parentgroup: 'Operating  Revenue',
    maingroup: 'Income',
    category: 'Other Revenue',
    hasmainledger: false,
    mainledger: 'Depreciation',
  },
  {
    sn: 10,
    accountcode: '5002',
    groupname: 'Rajesh',
    accountname: 'Depreciation Expense',
    subledgername: 'Suresh Dangol',
    accounttype: 'Expense',
    parentgroup: 'Operating Expenses',
    maingroup: 'Expenses',
    category: 'Cash Expense',
    hasmainledger: true,
    mainledger: 'Depreciation Ledger',
  },
];

@Component({
  selector: 'lib-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
})
export class GenericTableComponent implements OnInit {

  displayedColumns: string[] = [];
  displayedChartofAccountColumns: string[] = [];
  customerVendorDataSource = new MatTableDataSource<any>(ELEMENT_DATA);;
  chartofAccountDataSource = Chart_Of_Account_Data;
  activeRoute?:string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      ...(this.activeRoute == 'general-ledger' ? ['accountname'] : []),
      ...(this.activeRoute == 'ledger-group' ? ['groupname'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['subledgername'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['accountcode'] : []),
      ...(this.activeRoute == 'general-ledger' || this.activeRoute == 'ledger-group' ? ['accounttype'] : []),
      ...(this.activeRoute == 'general-ledger' || this.activeRoute == 'ledger-group' ? ['parentgroup'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['maingroup'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['category'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['hasmainledger'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['mainledger'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['status'] : []),
      ...(this.activeRoute == 'general-ledger' || this.activeRoute == 'ledger-group' || this.activeRoute == 'sub-ledger'
        ? ['action']
        : []),
    ];
    if(this.activeRoute == 'customer') this.getAllCustomers();

    
  }
  ngAfterViewInit() {
    this.customerVendorDataSource.paginator = this.paginator;
  }

  getAllCustomers(){
    this.partyMasterService.getCustomerList().subscribe((res:any) => {
      this.customerVendorDataSource.data = res.result;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerVendorDataSource.filter = filterValue.trim().toLowerCase();
  }
  navigateToCreateCustomer() {
    this.router.navigate(['/new-customer']);
  }

  navigateToCreateVendor() {
    this.router.navigate(['new-vendor']);
  }

}
