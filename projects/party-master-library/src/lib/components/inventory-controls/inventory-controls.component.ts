import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';


@Component({
  selector: 'lib-inventory-controls',
  templateUrl: './inventory-controls.component.html',
  styleUrls: ['./inventory-controls.component.css'],
})
export class InventoryControlsComponent implements OnInit {

  isTableVisible = false;
  constructor(private partyMasterService:PartyMasterLibraryService) { 
  }
  

  ngOnInit(): void {
  }



  ngAfterViewInit() {
  }


}
