import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-sub-ledger',
  templateUrl: './create-sub-ledger.component.html',
  styleUrls: ['./create-sub-ledger.component.css'],
})
export class CreateSubLedgerComponent {
  subLedgerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.subLedgerForm = this.fb.group({
      SubLedgerName: ['', Validators.required],
      PanNo: ['', Validators.required],
      MainLedgerName: ['', Validators.required],
      hasMainLedger: ['', Validators.required],
    });
  }

  submit() {
    if (this.subLedgerForm.valid) {
      console.log('Form Data', this.subLedgerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/sub-ledger']); // Navigate to the previous route
  }
}
