import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  Name: string;
  IsDefault:boolean;
  IsChecked:boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Name: 'John Doe John Doe',
    IsDefault:false,
    IsChecked:false
  },
  {
    Name: 'John Doe John Doe',
    IsDefault:false,
    IsChecked:false
  },
  {
    Name: 'John Doe John Doe',
    IsDefault:false,
    IsChecked:false
  },
];
@Component({
  selector: 'multiselect-generic-grid',
  templateUrl: './multiselect-generic-grid.component.html',
  styleUrls: ['./multiselect-generic-grid.component.css'],
})
export class MultiSelectGenericGridComponent {
  displayedColumns: displayedColumns[] = [];
  columnKeys: string[] = [];

  @Input() popupsettings!: MultiSelectGenericPopUpSettings;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  isActive:boolean=false;
  itemList: any[] = [];
    selectedRowIndex = 0;
  filterValue= new FormControl();
  filterOption: string = ""; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  show(){
    this.displayedColumns = [];
    if(this.popupsettings.columns && this.popupsettings.columns.length>0){
      this.popupsettings.columns.forEach((x:any) => {
        const columnTitle = x.title || '';  // Provide default empty string if undefined
        const columnKey = x.key || '';      // Provide default empty string if undefined
        this.displayedColumns.push({ columns: columnTitle, keys: columnKey });
      });
      this.columnKeys = this.displayedColumns.map(c => c.keys!).filter(key => key);
      this.isActive = true;
    }
  }

  close(){
    this.isActive = false;
  }
}

export class MultiSelectGenericPopUpSettings {
  title?: string;
  apiEndpoints?: string;
  columns?: ColumnSettings[] = [];
  defaultFilterIndex?= 0;
  showActionButton?= false;
  showIsDefaultSelection?: boolean = false;
}

export class ColumnSettings {
  key?: string;
  title?: string;
  hidden?= false;
  noSearch?= false;
  alignment?:any;
  pipe?:any = false;
}

export class displayedColumns{
  columns?:string;
  keys?:string;
}

