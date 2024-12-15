import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, inject, Output} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * @title Dialog elements
 */

@Component({
  selector: 'generic-division-mapping',
  templateUrl: './generic-division-mapping.component.html',
  styleUrls: ['./generic-division-mapping.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericDivisionMappingComponent {
  DialogObj:dialogObj = <dialogObj>{};
  filteredDivisionList:any[]=[];
  isOpen:boolean = false;

  @Output() selectedItems = new EventEmitter<any>();
  constructor(private cdr: ChangeDetectorRef){
    this.DialogObj.dataArray = [];
  }

  openDialog(dialogObj:dialogObj) {
    this.DialogObj = dialogObj;
    this.DialogObj.dataArray.forEach((x) => {
      x.isChecked = false;
    })
    this.filteredDivisionList = this.DialogObj.dataArray;
    this.isOpen = true;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredDivisionList = this.DialogObj.dataArray.filter(x => x.divisionName.toLowerCase().includes(filterValue.trim().toLowerCase()));
  }
  
  close(res:string) {
    if(res == "ok"){
      let divisionList = this.filteredDivisionList.filter(x => x.isChecked);
      if(divisionList && divisionList.length>0) this.selectedItems.emit(divisionList);
      else{
        alert("Please Select at least one division.");
        return;
      }
         
    }
    this.isOpen = false; // Method to close the pop-up
  }

  
  
}

export interface dialogObj{
  Title:string;
  dataArray:any[];
}
