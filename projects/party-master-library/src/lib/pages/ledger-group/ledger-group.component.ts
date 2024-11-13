import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-ledger-group',
  templateUrl: './ledger-group.component.html',
  styleUrls: ['./ledger-group.component.css']
})
export class LedgerGroupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onView(event:any){
    this.router.navigate([this.router.url+"/new-ledger-group",{acid:event, mode:'view',returnUrl: this.router.url}])
  }

}
