import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { VendorComponent } from './pages/vendor/vendor.component';
import { GeneralLedgerComponent } from './pages/general-ledger/general-ledger.component';
import { LedgerGroupComponent } from './pages/ledger-group/ledger-group.component';
import { SubLedgerComponent } from './pages/sub-ledger/sub-ledger.component';
import { CreateVendorComponent } from './pages/create-vendor/create-vendor.component';
import { CreateLedgerComponent } from './pages/create-ledger/create-ledger.component';
import { CreateLedgerGroupComponent } from './pages/create-ledger-group/create-ledger-group.component';
import { CreateSubLedgerComponent } from './pages/create-sub-ledger/create-sub-ledger.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'general-ledger', component: GeneralLedgerComponent },
  { path: 'ledger-group', component: LedgerGroupComponent },
  { path: 'sub-ledger', component: SubLedgerComponent },
  { path: 'customer/new-customer', component: CreateCustomerComponent },
  { path: 'vendor/new-vendor', component: CreateVendorComponent },
  { path: 'general-ledger/new-ledger', component: CreateLedgerComponent },
  { path: 'ledger-group/new-ledger-group', component: CreateLedgerGroupComponent },
  { path: 'sub-ledger/new-sub-ledger', component: CreateSubLedgerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyMasterLibraryRoutingModule {}
