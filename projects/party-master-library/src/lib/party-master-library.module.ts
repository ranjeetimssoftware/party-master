import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartyMasterLibraryComponent } from './party-master-library.component';
import { PartyMasterLibraryRoutingModule } from './party-master-library-routing.module';
import { CustomerComponent } from './pages/customer/customer.component';
import { MatTableModule } from '@angular/material/table';
import { GenericTableComponent } from './shared/components/generic/generic-table/generic-table.component';
import { GenericFilterComponent } from './shared/components/generic/generic-filter/generic-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { ContactPersonComponent } from './components/contact-person/contact-person.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { TermsAndConditionComponent } from './components/terms-condition/terms-condition.component';
import { MultiSelectGenericGridModule } from './shared/components/generic/multiselect-generic-grid/multiselect-generic-grid.module';
import { BankInformationComponent } from './components/bank-information/bank-information.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { SalesTargetComponent } from './components/sales-target/sales-target.component';
import { DMSComponent } from './components/dms/dms.component';
import { CreateLedgerGroupComponent } from './pages/create-ledger-group/create-ledger-group.component';
import { VendorComponent } from './pages/vendor/vendor.component';
import { GeneralLedgerComponent } from './pages/general-ledger/general-ledger.component';
import { LedgerGroupComponent } from './pages/ledger-group/ledger-group.component';
import { SubLedgerComponent } from './pages/sub-ledger/sub-ledger.component';
import { CreateVendorComponent } from './pages/create-vendor/create-vendor.component';
import { CreateLedgerComponent } from './pages/create-ledger/create-ledger.component';
import { CreateSubLedgerComponent } from './pages/create-sub-ledger/create-sub-ledger.component';
import { VendorAdditionalInfoComponent } from './components/vendor-additional-info/vendor-additional-info.component';
import { SpinnerService } from './shared/components/generic/spinner/spinner.service';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { PartyMasterLibraryService } from './party-master-library.service';
import { DivisionMappingComponent } from './components/division-mapping/division-mapping.component';
import { GenericDialogComponent } from './shared/components/generic/generic-dialog/generic-dialog.component';
import {MatTreeModule} from '@angular/material/tree';
import { GenericMenuComponent } from './shared/components/generic/generic-menu/generic-menu.component';
import { GenericNestedDropdownComponent } from './shared/components/generic/generic-nested-dropdown/generic-nested-dropdown.component';
import { ProductListComponent } from './pages/productList/productList.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { DetailInfoComponent } from './components/detail-info/detail-info.component';
import {MatExpansionModule} from '@angular/material/expansion';

import { AlternateUnitComponent } from './components/alternate-unit/alternate-unit.component';
import { BarcodeMappingComponent } from './components/barcode-mapping/barcode-mapping.component';
import { BatchwisePriceLogComponent } from './components/batchwise-price-log/batchwise-price-log.component';
import { MultipleRetailPriceComponent } from './components/multiple-retail-price/multiple-retail-price.component';


@NgModule({
  declarations: [
    PartyMasterLibraryComponent,
    CustomerComponent,
    GenericTableComponent,
    GenericFilterComponent,
    CreateCustomerComponent,
    AdditionalInfoComponent,
    ContactPersonComponent,
    ShippingAddressComponent,
    TermsAndConditionComponent,
    BankInformationComponent,
    DocumentUploadComponent,
    SalesTargetComponent,
    DMSComponent,
    VendorComponent,
    GeneralLedgerComponent,
    LedgerGroupComponent,
    SubLedgerComponent,
    CreateVendorComponent,
    CreateLedgerComponent,
    CreateLedgerGroupComponent,
    CreateSubLedgerComponent,
    VendorAdditionalInfoComponent,
    DivisionMappingComponent,
    GenericDialogComponent,
    GenericMenuComponent,
    GenericNestedDropdownComponent,
    ProductListComponent,
    CreateProductComponent,
    DetailInfoComponent,
    AlternateUnitComponent,
    BarcodeMappingComponent,
    BatchwisePriceLogComponent,
    MultipleRetailPriceComponent
  ],
  imports: [
    CommonModule,
    PartyMasterLibraryRoutingModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MultiSelectGenericGridModule,
    MatDialogModule,
    HttpClientModule,
    MatTreeModule,
    MatExpansionModule,
  ],
  exports: [PartyMasterLibraryComponent],
  providers:[SpinnerService]
})
export class PartyMasterLibraryModule {}
