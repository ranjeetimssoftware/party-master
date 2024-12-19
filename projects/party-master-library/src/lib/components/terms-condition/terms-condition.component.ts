import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MultiSelectGenericGridComponent, MultiSelectGenericPopUpSettings } from '../../shared/components/generic/multiselect-generic-grid/multiselect-generic-grid.component';
import { PartyMasterLibraryService } from '../../party-master-library.service';


export interface termsAndCondition{
  description:string;
  Title:string;
}


@Component({
  selector: 'lib-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsAndConditionComponent implements OnInit {
  viewTerms:boolean = false;
  termsAndCondition:termsAndCondition=<termsAndCondition>{};
  @ViewChild("genericMultiSelectTermsAndCondition") genericMultiSelectTermsAndCondition!: MultiSelectGenericGridComponent;
  gridPopupSettingsForTermsAndCondition: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();

  
  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.dataSource.data = this.partyMasterService.customermasterObj.customerPartyAccount.termsAndConditions;
  }

  ngOnInit(): void {
  }
  displayedColumns: string[] = [
    'sn',
    'Description',
    'IsDefault',
    'action'
  ];
  dataSource = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() termsAndConditions:any[] = [];
  @Input() mode:string = 'add';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEnterTermAndCondition(){
    this.gridPopupSettingsForTermsAndCondition = {
      title: "Terms And Conditions List",
      apiEndpoints: `/getPOTermsAndConditionsPagedList`,
      defaultFilterIndex: 1,
      showIsDefaultSelection: true,
      columns: [
        {
          key: "isCheck",
          title: "",
          hidden: false,
          noSearch: false
        },
        {
          key: "Label",
          title: "Name",
          hidden: false,
          noSearch: false
        },
        {
          key: "isDefault",
          title: "Is Default",
          hidden: false,
          noSearch: false
        },
      ]
    }
    this.genericMultiSelectTermsAndCondition.show();
  }
  onRemove(index: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.termsAndConditions.splice(index, 1);
      this.viewTerms = false;
    }
  }


  onViewTerms(terms:any){
    this.termsAndCondition.description = terms.TermsAndConditions;
    this.termsAndCondition.Title =  terms.Label;
    this.viewTerms = true;
  }
  closeTermsView(){
    this.viewTerms = false;
  }

  onCloseMultiSelectTermsAndCondition(event:any){
    this.termsAndConditions = event;
    this.partyMasterService.customermasterObj.customerPartyAccount.termsAndConditions = this.termsAndConditions;
  }

}
