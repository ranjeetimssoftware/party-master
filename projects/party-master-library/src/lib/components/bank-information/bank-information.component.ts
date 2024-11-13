import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  @Input() bankInformation!:BankInformation[];
  @Input() mode!:string;

  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.partyMasterService.customermasterObj.bankInformation = this.dataSource.data;        
  }

  ngOnInit(): void {
  
  }

  addNewRow():BankInformation{
    let newRow: BankInformation = { acid: '', bankCode: '', bankName: '', bankAccountNumber: '', isDefault:0 };
    return newRow;
  }

  onAddContact(){
    this.dataSource.data.push(this.newRow);
    this.newRow = this.addNewRow();
  }
  onRemoveContact(i:number){
    this.dataSource.data.splice(i,1);
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
