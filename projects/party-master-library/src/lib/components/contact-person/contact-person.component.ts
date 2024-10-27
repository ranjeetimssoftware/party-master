import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @Input() contactPersonArray!:ContactPersonObj[];

  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.partyMasterService.customermasterObj.ContactPerson = this.dataSource.data;        
  }

  ngOnInit(): void {
    // if(this.dataSource.data.length == 0){
    //   ELEMENT_DATA.push(this.newRow);
    // }else if(this.dataSource.data[this.dataSource.data.length-1].name != ''){
    //   ELEMENT_DATA.push(this.newRow);
    //   this.dataSource.data = [...ELEMENT_DATA];
    // }
  }

  addNewRow():ContactPersonObj{
    let newRow: ContactPersonObj = { name: '', contact: '', designation: '', email: '' };
    return newRow;
  }

  onAddContact(){
    this.dataSource.data.push(this.newRow);
    this.newRow = this.addNewRow();
  }
  onRemoveContact(i:number){
    this.dataSource.data.splice(i,1);
  }



  ngAfterViewInit() {
  }


}
