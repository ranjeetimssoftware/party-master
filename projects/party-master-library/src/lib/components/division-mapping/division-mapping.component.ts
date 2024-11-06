import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { MatTableDataSource } from '@angular/material/table';

export interface Branch {
  isChecked:boolean;
  NAME: string;
}

@Component({
  selector: 'lib-division-mapping',
  templateUrl: './division-mapping.component.html',
  styleUrls: ['./division-mapping.component.css'],
})
export class DivisionMappingComponent {
  isOpen: boolean = false;
  displayedColumns: string[] = [];
  selectedAccount: string | null = null;
  filteredDivisionList:any[]=[];
  DivisionList:any[]=[];  
  @Input() divList!:any[];
  constructor(private router: Router, private fb: FormBuilder,public partyMasterService:PartyMasterLibraryService) {
    this.displayedColumns = ['sn', 'branch', 'action'];
  }

  ngOnInit(){
    this.getDivisionList();
  }

  openDialog() {
    this.isOpen = true;
  }


  close(res:string) {
    if(res == "ok"){
      this.divList = this.filteredDivisionList.filter(x => x.isChecked);
    this.partyMasterService.customermasterObj.customerPartyAccount.divList = this.divList;
    }
    this.isOpen = false; // Method to close the pop-up
  }

  removeDivision(div:any){
    const index = this.divList.findIndex(x => x.div == div.div);
    if(index !== -1){
      this.divList.splice(index,1);
      let element = this.filteredDivisionList.find(x => x.div == div.div);
      element.isChecked = false;
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredDivisionList = this.DivisionList.filter(x => x.NAME.toLowerCase().includes(filterValue.trim().toLowerCase()));
  }

  getDivisionList(){
    this.partyMasterService.getDivisionList().subscribe((res:any) =>  {
      res.forEach((x:any) => {
        this.DivisionList.push({div:x.INITIAL,
           NAME:x.NAME,
        isChecked:false
          });
      })
      this.filteredDivisionList = this.DivisionList;  
    })
  }

}
