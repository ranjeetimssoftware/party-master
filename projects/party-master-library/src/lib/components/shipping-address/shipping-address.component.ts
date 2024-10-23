import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  sn: number;
  Shipping_Address: string;
  Contact_Person: string;
  Contact:string;
  Location: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    sn: 1,
    Shipping_Address: 'New Road',
    Contact_Person: 'Shreya',
    Contact: '98675465',
    Location: '23.89.76'
  },
  {
    sn: 2,
    Shipping_Address: 'New Road',
    Contact_Person: 'Shreya',
    Contact: '98675465',
    Location: '23.89.76'
  },
];

@Component({
  selector: 'lib-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  newRow: PeriodicElement = { sn: this.dataSource.data.length+1, Shipping_Address: '', Contact_Person: '', Contact: '', Location: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    if(this.dataSource.data[this.dataSource.data.length-1].Shipping_Address != ''){
      ELEMENT_DATA.push(this.newRow);
      this.dataSource.data = [...ELEMENT_DATA];
    }
  }
  displayedColumns: string[] = [
    'sn',
    'Shipping_Address',
    'Contact_Person',
    'Contact',
    'Location',
    'action'
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
