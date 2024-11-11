import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-create-ledger-group',
  templateUrl: './create-ledger-group.component.html',
  styleUrls: ['./create-ledger-group.component.css'],
})
export class CreateLedgerGroupComponent {
  ledgerGroupForm: FormGroup;
  returnUrl: string | undefined;

  menuData = [
    { label: 'Fixed Assets' },
    {
      label: 'Current Assets',
      children: [
        {
          label: 'Cash & Bank',
          children: [{ label: 'Cash' }, { label: 'Bank' }],
        },
        {
          label: 'Bills Receiveable',
          children: [{ label: 'Bills' }, { label: 'Receive' }],
        },
      ],
    },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.ledgerGroupForm = this.fb.group({
      AccountType: ['', Validators.required],
      ParentGroup: ['', Validators.required],
      GroupName: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
  }

  submit() {
    if (this.ledgerGroupForm.valid) {
      console.log('Form Data', this.ledgerGroupForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate([this.returnUrl]); // Navigate to the previous route
  }
}
