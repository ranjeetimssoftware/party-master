import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-generic-filter',
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.css'],
})
export class GenericFilterComponent implements OnInit {
  isCustomer: boolean = false;
  isVendor: boolean = false;
  isGeneralLedgerRoute: boolean = false;
  isLedgerGroupRoute: boolean = false;
  isSubLedgerRoute: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    const currentRoute = this.router.url;
    const lastSegment = currentRoute.split('/').pop(); // Get the last segment of the URL

    this.isCustomer = lastSegment === 'customer';
    this.isVendor = lastSegment === 'vendor';
    this.isGeneralLedgerRoute = lastSegment === 'general-ledger';
    this.isLedgerGroupRoute = lastSegment === 'ledger-group';
    this.isSubLedgerRoute = lastSegment === 'sub-ledger';
  }

  navigateToCreateCustomer() {
    this.router.navigate(['/new-customer']);
  }
  navigateToCreateVendor() {
    this.router.navigate(['new-vendor']);
  }
}
