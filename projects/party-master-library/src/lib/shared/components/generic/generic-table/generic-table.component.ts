import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  STATUS: number;
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
  STATUS: number;
}

const ELEMENT_DATA: CustomerVendor[] = [];

// Sample data for Chart of Accounts
const Chart_Of_Account_Data: ChartOfAccount[] = [];

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
  activeRoute?: string;
  loading: boolean = false;
  SearchOption:string = 'CUSTNAME';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onItemClick = new EventEmitter();
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @ViewChild('MenuDropdown') MenuDropdown!: ElementRef;
  @ViewChild('StatusDropdown') StatusDropdown!: ElementRef;
  @ViewChild('LedgerGroupMenuDropdown') LedgerGroupMenuDropdown!: ElementRef;


  constructor(
    private router: Router,
    public partyMasterService: PartyMasterLibraryService
  ) {
    const currentRoute = this.router.url;
    this.activeRoute = currentRoute.split('/').pop();
  }
  ngOnInit(): void {
    // Get the last segment of the URL

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
      ...(this.activeRoute == 'ledger-group' ? ['acname'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['subledgername'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['ACCODE'] : []),
      ...(this.activeRoute == 'general-ledger' ||
      this.activeRoute == 'ledger-group'
        ? ['actype']
        : []),
      ...(this.activeRoute == 'general-ledger'
        ? ['PARENTGROUP']
        : []),
        ...(
          this.activeRoute == 'ledger-group'
            ? ['parentacname']
            : []),
      ...(this.activeRoute == 'general-ledger' ? ['MAINGROUP'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['CATEGORY'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['hasmainledger'] : []),
      ...(this.activeRoute == 'sub-ledger' ? ['mainledger'] : []),
      ...(this.activeRoute == 'general-ledger' ? ['status'] : []),
      ...(this.activeRoute == 'general-ledger' ||
      this.activeRoute == 'ledger-group' ||
      this.activeRoute == 'sub-ledger'
        ? ['action']
        : []),
    ];
    if (this.activeRoute == 'customer' || this.activeRoute == 'product') this.getAllCustomers('C');
    if (this.activeRoute == 'vendor') this.getAllCustomers('V');
    if (this.activeRoute == 'general-ledger') this.getAllCustomers('A');
    if(this.activeRoute == 'ledger-group') this.getAllLedgerGroup();
    if(this.activeRoute == 'sub-ledger') this.getAllSubLedger();
  }
  ngAfterViewInit() {
    if (this.activeRoute == 'general-ledger' || this.activeRoute == 'ledger-group' || this.activeRoute == 'sub-ledger') {
      this.chartofAccountDataSource.paginator = this.paginator;
    } else {
      this.customerVendorDataSource.paginator = this.paginator;
    }
  }


  openDropdown() {
    this.dropdownMenu.nativeElement.classList.add('show');
  }

  closeDropdown() {
    this.dropdownMenu.nativeElement.classList.remove('show');
  }

  openMenuDropdown() {
    this.MenuDropdown.nativeElement.classList.add('show');
  }

  closeMenuDropdown() {
    this.MenuDropdown.nativeElement.classList.remove('show');
  }
  openStatusDropdown() {
    this.StatusDropdown.nativeElement.classList.add('show');
  }

  closeStatusDropdown() {
    this.StatusDropdown.nativeElement.classList.remove('show');
  }

  openLedgerGroupMenuDropdown() {
    this.LedgerGroupMenuDropdown.nativeElement.classList.add('show');
  }

  closeLedgerGroupMenuDropdown() {
    this.LedgerGroupMenuDropdown.nativeElement.classList.remove('show');
  }

  getAllCustomers(ptype: string) {
    this.loading = true;
    this.partyMasterService.getCustomerList(ptype).subscribe((res: any) => {
      if (res.status == 'ok') {
        if (this.activeRoute == 'general-ledger') {
          this.chartofAccountDataSource.data = res.result;
        } else {
          this.customerVendorDataSource.data = res.result;
        }
      } else if (res.status == 'error') {
        this.partyMasterService.openErrorDialog(res.result);
      }
    });
  }

  getAllLedgerGroup(){
    this.partyMasterService.getLedgerGroupList().subscribe((res:any) => {
      this.chartofAccountDataSource.data = res.result;
    })
  }

  getAllSubLedger(){
    this.partyMasterService.getSubLedgerList().subscribe((res:any) => {
      this.chartofAccountDataSource.data = res.result;
    })
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();;
    if (this.activeRoute === 'general-ledger' || this.activeRoute === 'ledger-group') {
      this.applyFilter(this.chartofAccountDataSource, filterValue);
    } else {
      this.applyFilter(this.customerVendorDataSource, filterValue);
    }
  }

  applyFilter(dataSource: MatTableDataSource<any>, filterValue: string): void {
    dataSource.filterPredicate = (data, filter) => {
      return data[this.SearchOption]?.toLowerCase().includes(filter);
    };
    dataSource.filter = filterValue;
  }
  updateSearchOption() {
    if (this.activeRoute === 'general-ledger' || this.activeRoute === 'ledger-group') {
      this.chartofAccountDataSource.filter = ''; // Reset and reapply the filter
    } else {
      this.customerVendorDataSource.filter = '';
    }
  }
  navigateToCreateCustomer() {
    const routePath = this.pathToNavigate() + 'customer';
    this.router.navigate([routePath+'/new-customer', { returnUrl: this.router.url }]);
  }
  
  navigateToProductMaster(){
    this.router.navigate([this.router.url+'/new-product', { returnUrl: this.router.url }]);
  }

  onViewClick($event: any) {
    this.onItemClick.emit($event);
  }

  navigateToCreateVendor() {
    const routePath = this.pathToNavigate() + 'vendor';
    this.router.navigate([routePath+'/new-vendor', { returnUrl: this.router.url }]);
  }

  navigateToCreateGeneralLedger() {
    const routePath = this.pathToNavigate() + 'general-ledger';
    this.router.navigate([routePath+'/new-ledger', { returnUrl: this.router.url }]);
  }

  navigateToCreateLedgerGroup() {
    const routePath = this.pathToNavigate() + 'ledger-group';
    this.router.navigate([routePath+'/new-ledger-group', { returnUrl: this.router.url }]);
  }

  navigateToCreateSubLedger() {
    this.router.navigate([this.router.url+'/new-sub-ledger', { returnUrl: this.router.url }]);
  }

  pathToNavigate():string{
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/');

    // Extract the last segment
    const lastSegment = urlSegments[urlSegments.length - 1];

    // Replace the last segment or add a new one
    const newPath = `${currentUrl.replace(lastSegment, '')}`;
    return newPath;

  }
}
