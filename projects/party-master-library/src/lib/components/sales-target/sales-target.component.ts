import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PartyMasterLibraryService, SalesTarget } from '../../party-master-library.service';


@Component({
  selector: 'lib-sales-target',
  templateUrl: './sales-target.component.html',
  styleUrls: ['./sales-target.component.css']
})
export class SalesTargetComponent implements OnInit {
  salesTargetForm:FormGroup;
  salesTargetObj:SalesTarget = <SalesTarget>{}
  @Input() salesTarget!:SalesTarget;
  @Input() mode!:string;


  constructor(private router: Router, private fb: FormBuilder, public partyMasterService:PartyMasterLibraryService) {
    this.salesTargetForm = this.fb.group({
      Yearly_Target:[0],
      Baisakh_Target:[0],      
      Jestha_Target:[0],      
      Ashar_Target:[0],      
      Shrawan_Target:[0],      
      Bhadra_Target:[0],      
      Ashwin_Target:[0],      
      Kartik_Target:[0],      
      Mangsir_Target:[0],      
      Poush_Target:[0],      
      Magh_Target:[0],      
      Falgun_Target:[0],      
      Chaitra_Target:[0],      
    });
    this.partyMasterService.customermasterObj.salesTarget = <SalesTarget>{};
  }

  ngOnInit(): void {
    if(this.mode == 'view'){
      this.salesTargetForm.disable();
    }
  }

  ngAfterViewInit() {
  }

  onInputChange(event: any){
    let value = event.target.value;
    if(value ===''){
      event.target.value='';
      return;
    }
    value= Math.min(Math.max(Number(value),0),100);

    if(value.toString().length>3){
      value = value.toString().slice(0,3);
    }
   event.target.value =value;
  }

}
