import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';

export interface ContactPersonObj {
  name: string;
  contact: string;
  designation:string;
  email: string;
}

const ELEMENT_DATA: ContactPersonObj[] = 
[
  {
    name: 'John Doe John Doe',
    contact: '123-456-7890',
    designation: 'senior manager',
    email: 'john@example.com'
  },
  {
    name: 'Jane Smith',
    contact: '987-654-3210',
    designation: 'senior manager',
    email: 'jane@example.com'
  },
];

@Component({
  selector: 'lib-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})
export class ContactPersonComponent implements OnInit {
  dataSource = new MatTableDataSource<ContactPersonObj>(ELEMENT_DATA);
  displayedColumns: string[] = [
    'sn',
    'name',
    'contact',
    'designation',
    'email',
    'action'
  ];
  newRow: any = { name: '', contact: '', designation: '', email: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
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
    this.dataSource.paginator = this.paginator;
    this.table.renderRows();
  }


}
