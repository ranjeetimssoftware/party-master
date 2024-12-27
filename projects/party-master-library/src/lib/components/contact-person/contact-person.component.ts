import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';

export interface ContactPersonObj {
  name: string;
  contact: string;
  designation:string;
  email: string;
}


@Component({
  selector: 'lib-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})
export class ContactPersonComponent implements OnInit {
  dataSource = new MatTableDataSource<ContactPersonObj>();
  activeIndex:number=0;
  displayedColumns: string[] = [
    'sn',
    'name',
    'contact',
    'designation',
    'email',
    'action'
  ];
  newRow: any = { name: '', contact: '', designation: '', email: '' };

  @Input() contactPersonArray:ContactPersonObj[] = [];
  @Input() mode:string='add';
  @ViewChildren('nameInput,emailInput,contactInput,designationInput') nameInputs!: QueryList<ElementRef>;
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.partyMasterService.customermasterObj.contactPerson = this.dataSource.data;        
  }

  ngOnInit(): void {
    if(this.mode == 'add'){
      this.contactPersonArray.push(this.newRow);
     }
     else if(this.mode == 'edit'){
      setTimeout(() => {
      this.contactPersonArray.push(this.newRow);
      }, 1000);
     }

  
  }
  focusOn(i: any){

    this.onAddContact()
  }

  activateIndex(index: number) {
    this.activeIndex = index;
  }
  addNewRow():ContactPersonObj{
    let newRow: ContactPersonObj = { name: '', contact: '', designation: '', email: '' };
    return newRow;
  }

  onAddContact() {
   if (this.contactPersonArray[this.activeIndex].name && this.contactPersonArray[this.activeIndex].contact) {
    if(!this.contactPersonArray[this.activeIndex+1]){
      this.newRow = this.addNewRow(); 
     this.contactPersonArray.push(this.newRow);
    }
  } else {
    alert('Name or contact is empty ');
  }
  }
  onRemoveContact(i:number){
    this.contactPersonArray.splice(i,1);
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
  
  ngAfterViewInit() {
  }


}
