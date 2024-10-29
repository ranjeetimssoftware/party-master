import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onView(event:any){
    this.router.navigate(["../new-vendor",{acid:event, mode:'view',returnUrl: this.router.url}])
  }

}
