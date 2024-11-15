import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css']
})
export class GeneralLedgerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onView(event:any){
    this.router.navigate([this.router.url+"/new-ledger",{acid:event, mode:'view',returnUrl: this.router.url}])
  }

}
