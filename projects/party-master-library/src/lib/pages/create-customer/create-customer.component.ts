import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericDialogComponent } from '../../shared/components/generic/generic-dialog/generic-dialog.component';

@Component({
  selector: 'lib-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  customerForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder,private dialog: MatDialog) {
    this.customerForm = this.fb.group({
      CustomerCode: ['', Validators.required],
      CustomerName: ['', Validators.required],
      Address: ['', Validators.required],
      VATNo: ['', Validators.required],
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
      Phone: [''],
      LedgerAc:[0]
    });
  }


  openDialog() {
    this.dialog.open(GenericDialogComponent, {
      data:{
        Title: "No data Found!"
      }
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
    if(this.customerForm.controls["CustomerName"].value == "" || this.customerForm.controls["CustomerName"].value == undefined || this.customerForm.controls["CustomerName"].value == null){
      alert("Please Enter Customer Name.");
      return;
    }
    if(this.customerForm.controls["Address"].value == "" || this.customerForm.controls["Address"].value == undefined || this.customerForm.controls["Address"].value == null){
      alert("Please Enter Address.");
      return;
    }
    if(this.customerForm.controls["Address"].value == "" || this.customerForm.controls["Address"].value == undefined || this.customerForm.controls["Address"].value == null){
      alert("Please Enter Address.");
      return;
    }
    if(this.customerForm.controls["VATNo"].value == "" || this.customerForm.controls["VATNo"].value == undefined || this.customerForm.controls["VATNo"].value == null){
      alert("Please Enter VAT No.");
      return;
    }
    if(this.customerForm.controls["Mobile"].value == "" || this.customerForm.controls["Mobile"].value == undefined || this.customerForm.controls["Mobile"].value == null){
      alert("Please Enter Mobile No.");
      return;
    }
  }

  goBack() {
    this.router.navigate(['/customer']); // Navigate to the previous route
  }
}
