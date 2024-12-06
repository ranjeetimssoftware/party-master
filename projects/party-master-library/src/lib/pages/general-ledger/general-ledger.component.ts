import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyMasterLibraryService } from '../../party-master-library.service';

@Component({
  selector: 'lib-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css']
})
export class GeneralLedgerComponent implements OnInit {

  constructor(private router: Router, private partyMasterService: PartyMasterLibraryService) { }

  ngOnInit(): void {
  }

  onView(event:any){
    this.router.navigate([this.router.url+"/new-ledger",{acid:event, mode:'view',returnUrl: this.router.url}])
  }
  onEdit(event:any){
    this.router.navigate([this.router.url+"/new-ledger",{acid:event, mode:'edit',returnUrl: this.router.url}])
  }
}
