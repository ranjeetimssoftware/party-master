import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-ledger-group',
  templateUrl: './create-ledger-group.component.html',
  styleUrls: ['./create-ledger-group.component.css'],
})
export class CreateLedgerGroupComponent {
  ledgerGroupForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.ledgerGroupForm = this.fb.group({
      AccountType: ['', Validators.required],
      ParentGroup: ['', Validators.required],
      GroupName: ['', Validators.required],
    });
  }

  submit() {
    if (this.ledgerGroupForm.valid) {
      console.log('Form Data', this.ledgerGroupForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/ledger-group']); // Navigate to the previous route
  }
}
