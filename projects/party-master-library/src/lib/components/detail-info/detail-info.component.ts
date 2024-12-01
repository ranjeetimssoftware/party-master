import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';


@Component({
  selector: 'lib-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css'],
})
export class DetailInfoComponent implements OnInit {
  isDiscounted:number=0;

  @ViewChild('DiscontinuedItem') DiscontinuedItem!: ElementRef;


  constructor(private partyMasterService:PartyMasterLibraryService, private cdr: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
  }

  onCheckOption(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isDiscounted = input.checked ? 1 : 0;
    this.cdr.detectChanges();
  }



  ngAfterViewInit() {
  }


}
