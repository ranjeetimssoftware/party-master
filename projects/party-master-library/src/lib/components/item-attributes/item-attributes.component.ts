import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';


@Component({
  selector: 'lib-item-attributes',
  templateUrl: './item-attributes.component.html',
  styleUrls: ['./item-attributes.component.css'],
})
export class ItemAttributesComponent implements OnInit {

  constructor(private partyMasterService:PartyMasterLibraryService) { 
  }
  

  ngOnInit(): void {
  }



  ngAfterViewInit() {
  }


}
