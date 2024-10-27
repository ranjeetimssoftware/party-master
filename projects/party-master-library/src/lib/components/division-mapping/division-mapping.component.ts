import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface Branch {
  sn: number;
  branch: string;
}

const ELEMENT_DATA: Branch[] = [
  {
    sn: 1,
    branch: 'Branch Name 1',
  },
  {
    sn: 2,
    branch: 'Branch Name 2',
  },
  {
    sn: 3,
    branch: 'Branch Name 3',
  },
  {
    sn: 3,
    branch: 'Branch Name 3',
  },
  {
    sn: 3,
    branch: 'Branch Name 3',
  },
  {
    sn: 3,
    branch: 'Branch Name 3',
  },
];

@Component({
  selector: 'lib-division-mapping',
  templateUrl: './division-mapping.component.html',
  styleUrls: ['./division-mapping.component.css'],
})
export class DivisionMappingComponent {
  isOpen: boolean = false;
  displayedColumns: string[] = [];
  branchDataSource = ELEMENT_DATA;
  selectedAccount: string | null = null;

  constructor(private router: Router, private fb: FormBuilder) {

    this.displayedColumns = ['sn', 'branch', 'action'];
  }

  openDialog() {
    this.isOpen = true;
  }


  close() {
    this.isOpen = false; // Method to close the pop-up
  }

}
