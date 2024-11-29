import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';


@Component({
  selector: 'lib-multiple-retail-price',
  templateUrl: './multiple-retail-price.component.html',
  styleUrls: ['./multiple-retail-price.component.css'],
})
export class MultipleRetailPriceComponent implements OnInit {
 

  constructor(private partyMasterService:PartyMasterLibraryService) { 
  }

  ngOnInit(): void {
  }

  



  ngAfterViewInit() {
  }


}
