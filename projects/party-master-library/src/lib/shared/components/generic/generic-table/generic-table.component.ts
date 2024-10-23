import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface CustomerVendor {
  sn: number;
  customername: string;
  vendorname: string;
  address: string;
  contact: string;
  email: string;
  vatno: string;
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

const ELEMENT_DATA: CustomerVendor[] = [
  {
    sn: 1,
    customername: 'John Doe John Doe',
    vendorname: 'John Doe John Doe',
    address: '123 Main St',
    contact: '123-456-7890',
    email: 'john@example.com',
    vatno: 'VAT123',
  },
  {
    sn: 2,
    customername: 'Jane Smith',
    vendorname: 'John Doe John Doe',
    address: '456 Oak St',
    contact: '987-654-3210',
    email: 'jane@example.com',
    vatno: 'VAT456',
  },
  {
    sn: 3,
    customername: 'Mike Johnson',
    vendorname: 'John Doe John Doe',
    address: '789 Pine St',
    contact: '555-123-4567',
    email: 'mike@example.com',
    vatno: 'VAT789',
  },
  {
    sn: 4,
    customername: 'Emily Davis',
    vendorname: 'John Doe John Doe',
    address: '321 Elm St',
    contact: '333-555-6789',
    email: 'emily@example.com',
    vatno: 'VAT012',
  },
  {
    sn: 5,
    customername: 'Robert Brown',
    vendorname: 'John Doe John Doe',
    address: '654 Cedar St',
    contact: '222-333-4444',
    email: 'robert@example.com',
    vatno: 'VAT345',
  },
  {
    sn: 6,
    customername: 'Alice Williams',
    vendorname: 'John Doe John Doe',
    address: '888 Maple St',
    contact: '444-555-6666',
    email: 'alice@example.com',
    vatno: 'VAT678',
  },
  {
    sn: 7,
    customername: 'David Wilson',
    vendorname: 'John Doe John Doe',
    address: '999 Birch St',
    contact: '111-222-3333',
    email: 'david@example.com',
    vatno: 'VAT901',
  },
  {
    sn: 8,
    customername: 'Laura White',
    vendorname: 'John Doe John Doe',
    address: '222 Cherry St',
    contact: '555-888-9999',
    email: 'laura@example.com',
    vatno: 'VAT234',
  },
  {
    sn: 9,
    customername: 'James Green',
    vendorname: 'John Doe John Doe',
    address: '333 Walnut St',
    contact: '777-888-9990',
    email: 'james@example.com',
    vatno: 'VAT588',
  },
  {
    sn: 10,
    customername: 'Sara Black',
    vendorname: 'John Doe John Doe',
    address: '444 Maple Ave',
    contact: '333-444-5555',
    email: 'sara@example.com',
    vatno: 'VAT890',
  },
];

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
  isCustomer: boolean = false;
  isVendor: boolean = false;
  isGeneralLedger: boolean = false;
  isLedgerGroup: boolean = false;
  isSubLedger: boolean = false;

  displayedColumns: string[] = [];
  displayedChartofAccountColumns: string[] = [];
  customerVendorDataSource = ELEMENT_DATA;
  chartofAccountDataSource = Chart_Of_Account_Data;

  constructor(private router: Router) {}
  ngOnInit(): void {
    const currentRoute = this.router.url;
    const lastSegment = currentRoute.split('/').pop(); // Get the last segment of the URL

    this.isCustomer = lastSegment === 'customer';
    this.isVendor = lastSegment === 'vendor';
    this.isGeneralLedger = lastSegment === 'general-ledger';
    this.isLedgerGroup = lastSegment === 'ledger-group';
    this.isSubLedger = lastSegment === 'sub-ledger';

    this.displayedColumns = [
      'filter',
      'sn',
      ...(this.isCustomer ? ['customername'] : []),
      ...(this.isVendor ? ['vendorname'] : []),
      'address',
      'contact',
      'email',
      'vatno',
      'status',
      'action',
    ];

    this.displayedChartofAccountColumns = [
      'filter',
      'sn',
      ...(this.isGeneralLedger ? ['accountname'] : []),
      ...(this.isLedgerGroup ? ['groupname'] : []),
      ...(this.isSubLedger ? ['subledgername'] : []),
      ...(this.isGeneralLedger ? ['accountcode'] : []),
      ...(this.isGeneralLedger || this.isLedgerGroup ? ['accounttype'] : []),
      ...(this.isGeneralLedger || this.isLedgerGroup ? ['parentgroup'] : []),
      ...(this.isGeneralLedger ? ['maingroup'] : []),
      ...(this.isGeneralLedger ? ['category'] : []),
      ...(this.isSubLedger ? ['hasmainledger'] : []),
      ...(this.isSubLedger ? ['mainledger'] : []),
      ...(this.isGeneralLedger ? ['status'] : []),
      ...(this.isGeneralLedger || this.isLedgerGroup || this.isSubLedger
        ? ['action']
        : []),
    ];
  }
}
