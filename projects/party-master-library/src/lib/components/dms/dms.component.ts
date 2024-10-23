import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-dms',
  templateUrl: './dms.component.html',
  styleUrls: ['./dms.component.css']
})
export class DMSComponent implements OnInit {

  salesTargetForm:FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.salesTargetForm = this.fb.group({
      Yearly_Target:[''],
      Baisakh_Target:[''],      
      Jestha_Target:[''],      
      Ashar_Target:[''],      
      Shrawan_Target:[''],      
      Bhadra_Target:[''],      
      Ashwin_Target:[''],      
      Kartik_Target:[''],      
      Mangsir_Target:[''],      
      Poush_Target:[''],      
      Magh_Target:[''],      
      Falgun_Target:[''],      
      Chaitra_Target:[''],      
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

}
