import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';


@Component({
  selector: 'lib-barcode-mapping',
  templateUrl: './barcode-mapping.component.html',
  styleUrls: ['./barcode-mapping.component.css'],
})
export class BarcodeMappingComponent implements OnInit {
  dataSource = [
    {
      sn: 1,
      alternateUnit: 'Box',
      conversionFactor: 10,
      salePriceDiscount: 5,
      salePrice: 50,
      isDefault: true,
      status: 'Active'
    },
    {
      sn: 2,
      alternateUnit: 'Piece',
      conversionFactor: 20,
      salePriceDiscount: 3,
      salePrice: 30,
      isDefault: false,
      status: 'Inactive'
    },
    // Add more data as needed
  ];
  constructor(private partyMasterService:PartyMasterLibraryService) { 
  }

  ngOnInit(): void {
  }



  ngAfterViewInit() {
  }


}
