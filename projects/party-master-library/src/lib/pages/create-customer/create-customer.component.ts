import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  customerForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      CustomerCode: ['', Validators.required],
      CustomerName: ['', Validators.required],
      Address: ['', Validators.required],
      VATNo: ['', Validators.required],
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
      Phone: ['', Validators.required],
      LedgerAc:['']
    });
  }

  selectedTab: number = 0;

  // Method to handle tab change
  onTabChange(index: number) {
    this.selectedTab = index;
  }

  submit() {
    if (this.customerForm.valid) {
      console.log('Form Data', this.customerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/customer']); // Navigate to the previous route
  }
}
