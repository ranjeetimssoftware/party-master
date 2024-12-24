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
  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.partyMasterService.customermasterObj.contactPerson = this.dataSource.data;        
  }

  ngOnInit(): void {
  
  }
  focusOn(i: any){

    this.onAddContact()
  }
  addNewRow():ContactPersonObj{
    let newRow: ContactPersonObj = { name: '', contact: '', designation: '', email: '' };
    return newRow;
  }

  onAddContact() {
   let i = this.contactPersonArray.length
   console.log(this.newRow.name)
   if (this.newRow.name && this.newRow.contact) {
    this.contactPersonArray.push(this.newRow);
    this.newRow = this.addNewRow(); 
  } else {
    alert('Name or contact is empty ');
  }
  }
  onRemoveContact(i:number){
    this.contactPersonArray.splice(i,1);
  }

  focusNext( currentIndex: number): void {
    // event.preventDefault(); 
    const inputList = this.nameInputs.toArray();
    const nextIndex = currentIndex + 1;
    if (inputList[nextIndex]) {
      inputList[nextIndex].nativeElement.focus();
    }
  }

  ngAfterViewInit() {
  }


}
