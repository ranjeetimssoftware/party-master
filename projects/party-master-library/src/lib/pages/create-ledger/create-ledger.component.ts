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
  selector: 'lib-create-ledger',
  templateUrl: './create-ledger.component.html',
  styleUrls: ['./create-ledger.component.css'],
})
export class CreateLedgerComponent {
  isOpen: boolean = false;
  displayedColumns: string[] = [];
  branchDataSource = ELEMENT_DATA;
  selectedAccount: string | null = null;

  ledgerForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.ledgerForm = this.fb.group({
      AccountCode: ['', Validators.required],
      AccountType: ['', Validators.required],
      AccountName: ['', Validators.required],
      ParentGroup: ['', Validators.required],
      Category: ['', Validators.required],
      CreditLimit: ['', Validators.required],
      Tds: ['', Validators.required],
      ActivityType: ['', Validators.required],
      HasSubLedger: ['', Validators.required],
      AllBranches: ['', Validators.required],
    });

    this.displayedColumns = ['sn', 'branch', 'action'];
  }

  openDialog() {
    this.isOpen = true;
  }

  save() {
    this.isOpen = false; // Method to close the pop-up
  }

  close() {
    this.isOpen = false; // Method to close the pop-up
  }

  submit() {
    if (this.ledgerForm.valid) {
      console.log('Form Data', this.ledgerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/general-ledger']); // Navigate to the previous route
  }
}
