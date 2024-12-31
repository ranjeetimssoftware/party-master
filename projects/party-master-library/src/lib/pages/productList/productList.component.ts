import { Component, ViewChild, OnInit } from '@angular/core';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { CustomerVendor, GenericTableComponent } from '../../shared/components/generic/generic-table/generic-table.component';
import { Router } from '@angular/router';
import { ProductMasterService } from '../Product-master.service';

@Component({
  selector: 'lib-product',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(public partyMasterService:PartyMasterLibraryService,
  private router: Router,
  public productMasterService: ProductMasterService
  ){
  }
  productgrouptree:any =[];
  showPopup = false;
  showCustomizeColumnsPopup = false;
  customerData:CustomerVendor[]=[];

  ngOnInit(){
    this.productMasterService.getMainGroupList();
    
  }
  
  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  // Method to open the popup
  openCustomizeColumnsPopup() {
    this.showCustomizeColumnsPopup = true;
  }

  // Method to close the popup
  closeCustomizeColumnsPopup() {
    this.showCustomizeColumnsPopup = false;
  }

  onView(event:any){
    this.router.navigate([this.router.url+"/new-product",{MCODE:event, mode:'view',returnUrl: this.router.url}])
  }
  onEdit(event:any){
    this.router.navigate([this.router.url+"/new-product",{MCODE:event, mode:'edit',returnUrl: this.router.url}])
  }

  // Method to handle save action
  saveChanges() {
    console.log('Popup Save clicked!');
    this.closeCustomizeColumnsPopup(); // Close the popup after saving
  }
}
