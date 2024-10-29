import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-create-sub-ledger',
  templateUrl: './create-sub-ledger.component.html',
  styleUrls: ['./create-sub-ledger.component.css'],
})
export class CreateSubLedgerComponent {
  subLedgerForm: FormGroup;
  returnUrl: string | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.subLedgerForm = this.fb.group({
      SubLedgerName: ['', Validators.required],
      PanNo: ['', Validators.required],
      MainLedgerName: ['', Validators.required],
      hasMainLedger: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
  }

  submit() {
    if (this.subLedgerForm.valid) {
      console.log('Form Data', this.subLedgerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate([this.returnUrl]); // Navigate to the previous route
  }
}
