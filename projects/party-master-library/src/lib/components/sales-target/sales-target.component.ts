import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartyMasterLibraryService, SalesTarget } from '../../party-master-library.service';

@Component({
  selector: 'lib-sales-target',
  templateUrl: './sales-target.component.html',
  styleUrls: ['./sales-target.component.css']
})
export class SalesTargetComponent implements OnInit {
  salesTargetForm: FormGroup;
  salesTargetObj: SalesTarget = <SalesTarget>{};
  @Input() salesTarget!: SalesTarget;
  @Input() mode!: string;
  @Output() formValidated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public partyMasterService: PartyMasterLibraryService
  ) {
    // Set default value for all fields to 0
    this.salesTargetForm = this.fb.group({
      Yearly_Target: [0, Validators.required],
      Baisakh_Target: [0, [Validators.min(0), Validators.max(100)]],
      Jestha_Target: [0, [Validators.min(0), Validators.max(100)]],
      Ashar_Target: [0, [Validators.min(0), Validators.max(100)]],
      Shrawan_Target: [0, [Validators.min(0), Validators.max(100)]],
      Bhadra_Target: [0, [Validators.min(0), Validators.max(100)]],
      Ashwin_Target: [0, [Validators.min(0), Validators.max(100)]],
      Kartik_Target: [0, [Validators.min(0), Validators.max(100)]],
      Mangsir_Target: [0, [Validators.min(0), Validators.max(100)]],
      Poush_Target: [0, [Validators.min(0), Validators.max(100)]],
      Magh_Target: [0, [Validators.min(0), Validators.max(100)]],
      Falgun_Target: [0, [Validators.min(0), Validators.max(100)]],
      Chaitra_Target: [0, [Validators.min(0), Validators.max(100)]],
    });

    this.partyMasterService.customermasterObj.salesTarget = <SalesTarget>{};
  }

  ngOnInit(): void {
    if (this.mode == 'view') {
      this.salesTargetForm.disable(); // Disable the form if the mode is 'view'
    }
    this.setupImmediateValidation();
  }

  setupImmediateValidation():void{
    Object.keys(this.salesTargetForm.controls).filter((controlName)=> controlName !=='Yearly_Target')
    .forEach((controlName)=>{
      this.salesTargetForm.controls[controlName].valueChanges.subscribe((value)=>{
        if(value>100){
          this.partyMasterService.openSuccessDialog('Monthly balance should be 100% !!');
        }
      });
     
    });
  }

  ngAfterViewInit() {}

  validateAndSubmit(): boolean {
    const yearlyTarget = this.salesTargetForm.value.Yearly_Target;

    // Step 1: Check if Yearly_Target is filled
    if (!yearlyTarget || yearlyTarget === 0) {
      this.partyMasterService.openSuccessDialog('Yearly Target must be filled!');
      this.formValidated.emit(false); // Emit validation result
      return false;
    }

    // Step 2: Calculate sum of monthly targets
    const monthlyTargets = [
      this.salesTargetForm.value.Baisakh_Target,
      this.salesTargetForm.value.Jestha_Target ,
      this.salesTargetForm.value.Ashar_Target ,
      this.salesTargetForm.value.Shrawan_Target ,
      this.salesTargetForm.value.Bhadra_Target ,
      this.salesTargetForm.value.Ashwin_Target ,
      this.salesTargetForm.value.Kartik_Target ,
      this.salesTargetForm.value.Mangsir_Target ,
      this.salesTargetForm.value.Poush_Target ,
      this.salesTargetForm.value.Magh_Target ,
      this.salesTargetForm.value.Falgun_Target ,
      this.salesTargetForm.value.Chaitra_Target ,
    ].map(value => {
      // Convert empty strings or null values to 0
      if (value === '' || value == null) {
        return 0;
      }
      return Number(value); // Otherwise, convert to number
    });
    this.salesTargetForm.setValue({
      ...this.salesTargetForm.value,
      Baisakh_Target: monthlyTargets[0],
      Jestha_Target: monthlyTargets[1],
      Ashar_Target: monthlyTargets[2],
      Shrawan_Target: monthlyTargets[3],
      Bhadra_Target: monthlyTargets[4],
      Ashwin_Target: monthlyTargets[5],
      Kartik_Target: monthlyTargets[6],
      Mangsir_Target: monthlyTargets[7],
      Poush_Target: monthlyTargets[8],
      Magh_Target: monthlyTargets[9],
      Falgun_Target: monthlyTargets[10],
      Chaitra_Target: monthlyTargets[11]
    },
    {emitEvent: false}
  );

    const totalMonthlyTarget = monthlyTargets.reduce((sum, value) => sum + value, 0);

    // Step 3: Check if total is 100
    if (totalMonthlyTarget !== 100) {
      this.partyMasterService.openSuccessDialog('Monthly balance should be 100% !!');
      this.formValidated.emit(false); // Emit validation result
      return false;
    }

    // Emit validation success
    this.formValidated.emit(true);
    return true;
  
  }
  
}
