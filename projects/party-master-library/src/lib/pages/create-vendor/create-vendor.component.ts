import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.css'],
})
export class CreateVendorComponent {
  vendorForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.vendorForm = this.fb.group({
      VendorCode: ['', Validators.required],
      VendorName: ['', Validators.required],
      Address: ['', Validators.required],
      VATNo: ['', Validators.required],
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
      Phone: ['', Validators.required],
    });
  }

  selectedTab: number = 0;

  // Method to handle tab change
  onTabChange(index: number) {
    this.selectedTab = index;
  }

  submit() {
    if (this.vendorForm.valid) {
      console.log('Form Data', this.vendorForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/vendor']); // Navigate to the previous route
  }
}
