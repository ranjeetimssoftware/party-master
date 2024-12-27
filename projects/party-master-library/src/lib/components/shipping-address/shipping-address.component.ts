import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService, ShippingAddress } from '../../party-master-library.service';



@Component({
  selector: 'lib-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
  activeIndex:number=0;
  dataSource = new MatTableDataSource<ShippingAddress>();
  newRow: ShippingAddress = { address: '', name: '', phone: '', locationmap: '', ACID:'' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  nameInputs!: QueryList<ElementRef>;
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;


  @Input() shippingAdresses!:ShippingAddress[];
  @Input() mode!:string;
 
  

  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.partyMasterService.customermasterObj.shippingAdresses = this.dataSource.data;        
  }

  ngOnInit(): void {
    if(this.mode == 'add'){
      this.shippingAdresses.push(this.newRow);
     }
     else if(this.mode == 'edit'){
      setTimeout(() => {
      this.shippingAdresses.push(this.newRow);
      }, 1000);
     }
  }

  activateIndex(index: number) {
    this.activeIndex = index;
  }

  addNewRow():ShippingAddress{
    let newRow: ShippingAddress = { address: '', name: '', phone: '', locationmap: '', ACID:'' };
    return newRow;
  }

  onAddContact(){
    if (this.shippingAdresses[this.activeIndex].name && this.shippingAdresses[this.activeIndex].address) {
      if(!this.shippingAdresses[this.activeIndex+1]){
        this.newRow = this.addNewRow(); 
       this.shippingAdresses.push(this.newRow);
  }
}}

focusNext(currentIndex: number): void {
  // Ensure inputs are captured correctly
  const inputElements = this.inputFields?.toArray();

  // Debug: Log all inputs
  console.log('Captured Inputs:', inputElements);

  // Validate the input list
  if (!inputElements || inputElements.length === 0) {
    console.error('No input elements found in inputFields.');
    return;
  }

  // Calculate the next index
  const nextIndex = currentIndex + 1;

  // Check if the next element exists
  if (nextIndex < inputElements.length) {
    const nextElement = inputElements[nextIndex]?.nativeElement;
    console.log(`Focusing element at index ${nextIndex}`, nextElement);

    if (nextElement && typeof nextElement.focus === 'function') {
      nextElement.focus();
    } else {
      console.warn(`Element at index ${nextIndex} is not focusable.`);
    }
  } else {
    console.log('Reached the end of the inputs.');
  }
}
  onRemoveContact(i:number){
    this.dataSource.data.splice(i,1);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
