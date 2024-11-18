import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-sub-ledger',
  templateUrl: './sub-ledger.component.html',
  styleUrls: ['./sub-ledger.component.css']
})
export class SubLedgerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onView(event:any){
    this.router.navigate([this.router.url+"/new-sub-ledger",{acid:event, mode:'view',returnUrl: this.router.url}])
  }

}
