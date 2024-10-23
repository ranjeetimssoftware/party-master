import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  sn: number;
  Name: string;
  contact: string;
  designation:string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    sn: 1,
    Name: 'John Doe John Doe',
    contact: '123-456-7890',
    designation: 'senior manager',
    email: 'john@example.com'
  },
  {
    sn: 2,
    Name: 'Jane Smith',
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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  newRow: PeriodicElement = { sn: this.dataSource.data.length+1, Name: '', contact: '', designation: '', email: '' };

  constructor() { }

  ngOnInit(): void {
    if(this.dataSource.data[this.dataSource.data.length-1].Name != ''){
      ELEMENT_DATA.push(this.newRow);
      this.dataSource.data = [...ELEMENT_DATA];
    }
  }
  displayedColumns: string[] = [
    'sn',
    'Name',
    'contact',
    'designation',
    'email',
    'action'
  ];


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
