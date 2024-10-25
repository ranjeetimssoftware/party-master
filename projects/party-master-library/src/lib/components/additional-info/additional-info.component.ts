import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css'],
})
export class AdditionalInfoComponent {
  additionalInfoForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.additionalInfoForm = this.fb.group({
      MenuCategory: [''],
      CreditLimit: [],
      CreditDays: [],
      IsOverseas:[0],
      Area: [''],
      Province: [''],
      District: [''],
      Salesman: [''],
      ContractPrice:[''],
      IsContractPrice:[0],
      IsCustomerMember:[0],
      Gender:[''],
      DOB:[''],
      WeddingAnniversary:[''],
      WorkingOrganization:[''],
      Designation:[''],
      Status:[1],
      Membership_Scheme:[''],
      Membership_StartDate:[''],
      Membership_EndDate:[''],
      Membership_Barcode:[''],
    });
  }
}
