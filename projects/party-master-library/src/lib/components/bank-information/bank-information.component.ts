import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BankInformation, PartyMasterLibraryService } from '../../party-master-library.service';


@Component({
  selector: 'lib-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.css']
})
export class BankInformationComponent implements OnInit {
  dataSource = new MatTableDataSource<BankInformation>();
  newRow: BankInformation = { acid: '', bankCode: '', bankName: '', bankAccountNumber: '', isDefault:0 };
  activeIndex:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  nameInputs!: QueryList<ElementRef>;
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  @Input() bankInformation!:BankInformation[];
  @Input() mode!:string;

  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.partyMasterService.customermasterObj.bankInformation = this.dataSource.data;        
  }

  ngOnInit(): void {
    if(this.mode == 'add'){
      this.bankInformation.push(this.newRow);
     }
     else if(this.mode == 'edit'){
      setTimeout(() => {
      this.bankInformation.push(this.newRow);
      }, 1000);
     }

  }

  activateIndex(index: number) {
    this.activeIndex = index;
  }
  
  addNewRow():BankInformation{
    let newRow: BankInformation = { acid: '', bankCode: '', bankName: '', bankAccountNumber: '', isDefault:0 };
    return newRow;
  }

  onAddContact(){
    if (this.bankInformation[this.activeIndex].bankCode && this.bankInformation[this.activeIndex].bankName) {
      if(!this.bankInformation[this.activeIndex+1]){
        this.newRow = this.addNewRow(); 
       this.bankInformation.push(this.newRow);
      }
  }
}
  onRemoveContact(i:number){
    this.dataSource.data.splice(i,1);
  }

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
  onCheckIsDefault(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.newRow.isDefault = 1;
    }else{
      this.newRow.isDefault = 0;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
