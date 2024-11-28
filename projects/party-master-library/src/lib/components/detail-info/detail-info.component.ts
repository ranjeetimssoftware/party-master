import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';


@Component({
  selector: 'lib-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css'],
})
export class DetailInfoComponent implements OnInit {
  isDiscounted:number=0;

  constructor(private partyMasterService:PartyMasterLibraryService) { 
  }

  ngOnInit(): void {
  }

  onCheckOption(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.isDiscounted = 1;
    }else{
      this.isDiscounted = 0;
    }
  }



  ngAfterViewInit() {
  }


}
