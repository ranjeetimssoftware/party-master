import { Component, OnInit } from '@angular/core';
import { PartyMasterLibraryService } from './party-master-library.service';

@Component({
  selector: 'lib-party-master-library',
  templateUrl: 'party-master-library.component.html',
  styles: ['party-master-library.component.css'],
})
export class PartyMasterLibraryComponent implements OnInit {
  userSettings:any;
  constructor(private partyMaster:PartyMasterLibraryService) {
    this.partyMaster.getAllsettings().subscribe((res:any) => {
      if(res.status == "ok")
      this.partyMaster.userSettings = JSON.parse(res.result);
    this.userSettings = this.partyMaster.userSettings;
    })
  }
  ngOnInit(): void {}
}
