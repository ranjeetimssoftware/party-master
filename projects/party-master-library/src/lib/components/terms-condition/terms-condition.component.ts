import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MultiSelectGenericGridComponent, MultiSelectGenericPopUpSettings } from '../../shared/components/generic/multiselect-generic-grid/multiselect-generic-grid.component';

export interface PeriodicElement {
  sn: number;
  Description: string;
  IsDefault: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    sn: 1,
    Description: 'UFL',
    IsDefault: true,
  },
  {
    sn: 2,
    Description: 'TNBL',
    IsDefault: false,
  },
];

@Component({
  selector: 'lib-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsAndConditionComponent implements OnInit {
  newRow: PeriodicElement = { sn: 0, Description: '', IsDefault: false };
  viewTerms:boolean = false;
  @ViewChild("genericMultiSelectTermsAndCondition") genericMultiSelectTermsAndCondition!: MultiSelectGenericGridComponent;
  gridPopupSettingsForTermsAndCondition: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = [
    'sn',
    'Description',
    'IsDefault',
    'action'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEnterTermAndCondition(){
    this.gridPopupSettingsForTermsAndCondition = {
      title: "Terms And Conditions List",
      apiEndpoints: `/getPOTermsAndConditionsPagedList`,
      defaultFilterIndex: 0,
      showIsDefaultSelection: true,
      columns: [
        {
          key: "Name",
          title: "Name",
          hidden: false,
          noSearch: false
        },
        {
          key: "IsDefault",
          title: "Is Default",
          hidden: false,
          noSearch: false
        },
      ]
    }
    this.genericMultiSelectTermsAndCondition.show();
  }

  onViewTerms(){
    this.viewTerms = !this.viewTerms
  }

}
