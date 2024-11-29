import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';


@Component({
  selector: 'lib-body-part-list',
  templateUrl: './body-part-list.component.html',
  styleUrls: ['./body-part-list.component.css'],
})
export class BodyPartListComponent implements OnInit {

  constructor(private partyMasterService:PartyMasterLibraryService) { 
  }
  

  ngOnInit(): void {
  }



  ngAfterViewInit() {
  }


}
