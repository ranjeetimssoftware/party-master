import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PartyMasterLibraryService } from './party-master-library.service';

@Component({
  selector: 'lib-party-master-library',
  templateUrl: 'party-master-library.component.html',
  styleUrls: ["party-master-library.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class PartyMasterLibraryComponent implements OnInit {
  userSettings:any;
  constructor(private partyMaster:PartyMasterLibraryService) {
    
  }
  ngOnInit(): void {}
}
