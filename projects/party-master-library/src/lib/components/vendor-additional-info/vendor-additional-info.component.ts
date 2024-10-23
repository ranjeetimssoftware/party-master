import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-vendor-additional-info',
  templateUrl: './vendor-additional-info.component.html',
  styleUrls: ['./vendor-additional-info.component.css'],
})
export class VendorAdditionalInfoComponent {
  vendorAdditionalInfoForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.vendorAdditionalInfoForm = this.fb.group({
      Category: ['', Validators.required],
      VendorType: ['', Validators.required],
      CustomerVendor: ['', Validators.required],
      CreditLimit: ['', Validators.required],
      CreditDays: ['', Validators.required],
      ContractPrice: ['', Validators.required],
      SelectContractPrice: ['', Validators.required],
      VendorStatus: ['', Validators.required],
    });
  }
}
