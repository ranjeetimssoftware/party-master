import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyMasterLibraryService } from '../../party-master-library.service';

@Component({
  selector: 'lib-create-ledger-group',
  templateUrl: './create-ledger-group.component.html',
  styleUrls: ['./create-ledger-group.component.css'],
})
export class CreateLedgerGroupComponent {
  ledgerGroupForm: FormGroup;
  returnUrl: string | undefined;
  ParentGroup:any;
  menuData:any;
  mode:string = 'add';
  ledgerGroup:LedgerGroupObj = <LedgerGroupObj>{}

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    public partyMasterService: PartyMasterLibraryService,
  ) {
    this.ledgerGroupForm = this.fb.group({
      AccountType: ['', Validators.required],
      ParentGroup: ['', Validators.required],
      GroupName: ['', Validators.required],
    });
    this.getParentGroupTree();
  }

  ngOnInit() {
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
    if (!!this._activatedRoute.snapshot.params['mode']) {
      if (this._activatedRoute.snapshot.params['mode'] === 'view') {
        this.mode = 'view';
        this.ledgerGroupForm.disable();
      }
      let acid = this._activatedRoute.snapshot.params['acid'];
      this.partyMasterService
        .getLedgerGroup(acid).subscribe((res:any) => {
          if(res.status == "ok"){
            this.ledgerGroup = res.result;
            this.filterParentGroup(this.ledgerGroup.ACTYPE);
          }
          else if(res.status == "error"){
            this.partyMasterService.openErrorDialog(res.result);
          }
        },error => {
          this.partyMasterService.openErrorDialog(error.error.detail);
        })
    }
  }

  getParentGroupTree(){
    this.partyMasterService.getParentGroupTree().subscribe((res:any) => {
      if(res.status == "ok"){
        this.menuData = res.result;
      }
    })
  }

  onAccountTypeChange(event:Event){
    const input = event.target as HTMLInputElement;
    this.filterParentGroup(input.value);
  }

  filterParentGroup(actype:string){
    this.ParentGroup = this.menuData.filter((x:any) => x.actype == actype);
  }

  onSelectParent(event: any) {
    this.ledgerGroup.PARENT =
      event.accode;
  }

  goBack() {
    this.router.navigate([this.returnUrl]); // Navigate to the previous route
  }

  onSubmit(){
    if(this.ledgerGroup.ACTYPE == '' || this.ledgerGroup.ACTYPE == null || this.ledgerGroup.ACTYPE == undefined){
      this.partyMasterService.openSuccessDialog("Please select Account Type.");
      return;      
    }
    if(this.ledgerGroup.PARENT == '' || this.ledgerGroup.PARENT == undefined || this.ledgerGroup.PARENT == null){
      this.partyMasterService.openSuccessDialog("Please select Parent Group.");
      return; 
    }
    if(this.ledgerGroup.ACNAME == '' || this.ledgerGroup.ACNAME == undefined || this.ledgerGroup.ACNAME == null){
      this.partyMasterService.openSuccessDialog("Please Enter Group Name.");
      return; 
    }
    this.partyMasterService.saveNewLedgerGroup(this.mode, this.ledgerGroup).subscribe((res:any) => {
      if (res.status == 'ok') {
        this.partyMasterService.openSuccessDialog(res.result);
        this.ledgerGroup = <LedgerGroupObj>{};
        this.router.navigate([this.returnUrl]); // Navigate to the previous route
      } else if (res.status == 'error') {
        this.partyMasterService.openErrorDialog(res.result);
      }else if(res.status == 400){
        this.partyMasterService.openErrorDialog(res.detail);
      }
    },
    error => {
      this.partyMasterService.openErrorDialog(error.error.detail);
    })
  }
}

export interface LedgerGroupObj{
  ACID:string;
  ACNAME:string;
  PARENT:string;
  ACTYPE:string;
  parentacname:string;
}
