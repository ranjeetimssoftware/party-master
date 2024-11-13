import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService, ShippingAddress } from '../../party-master-library.service';



@Component({
  selector: 'lib-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
  dataSource = new MatTableDataSource<ShippingAddress>();
  newRow: ShippingAddress = { address: '', name: '', phone: '', locationmap: '', ACID:'' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  @Input() shippingAdresses!:ShippingAddress[];
  @Input() mode!:string;

  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.partyMasterService.customermasterObj.shippingAdresses = this.dataSource.data;        
  }

  ngOnInit(): void {
  
  }

  addNewRow():ShippingAddress{
    let newRow: ShippingAddress = { address: '', name: '', phone: '', locationmap: '', ACID:'' };
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
  }

}
