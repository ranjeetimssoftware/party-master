import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  sn: number;
  BankName: string;
  BankCode: string;
  AccountNumber:string;
  IsDefault: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    sn: 1,
    BankName: 'Prabhu Bank',
    BankCode: 'PBL',
    AccountNumber: '0557765544',
    IsDefault: true
  },
  {
    sn: 2,
    BankName: 'NMB Bank',
    BankCode: 'NMBK',
    AccountNumber: '78998675465',
    IsDefault: false
  },
];

@Component({
  selector: 'lib-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.css']
})
export class BankInformationComponent implements OnInit {
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  newRow: PeriodicElement = { sn: this.dataSource.data.length+1, BankName: '', BankCode: '', AccountNumber: '', IsDefault: false };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    if(this.dataSource.data[this.dataSource.data.length-1].BankName != ''){
      ELEMENT_DATA.push(this.newRow);
      this.dataSource.data = [...ELEMENT_DATA];
    }
  }
  displayedColumns: string[] = [
    'sn',
    'BankName',
    'BankCode',
    'AccountNumber',
    'IsDefault',
    'action'
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
