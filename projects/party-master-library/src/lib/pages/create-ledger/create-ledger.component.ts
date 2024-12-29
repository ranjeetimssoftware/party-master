import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdditionalInfo,
  CustomerMasterObj,
  CustomerPartyAccountObj,
  PartyMasterLibraryService,
} from '../../party-master-library.service';

export interface Branch {
  sn: number;
  branch: string;
}


const ELEMENT_DATA: Branch[] = [];

@Component({
  selector: 'lib-create-ledger',
  templateUrl: './create-ledger.component.html',
  styleUrls: ['./create-ledger.component.css'],
})
export class CreateLedgerComponent {
  mode: string = 'add';
  userSettings: any;
  isOpen: boolean = false;
  displayedColumns: string[] = [];
  branchDataSource = ELEMENT_DATA;
  selectedAccount: string | null = null;
  [key: string]: any; // Add this line
  returnUrl: string | undefined;
  ParentGroup:any;

  menuData:any;

  ledgerForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public partyMasterService: PartyMasterLibraryService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.partyMasterService.customermasterObj = <CustomerMasterObj>{};
    this.partyMasterService.customermasterObj.AdditionalInfo = <AdditionalInfo>{};
    this.partyMasterService.customermasterObj.customerPartyAccount = <CustomerPartyAccountObj>{};
    this.partyMasterService.customermasterObj.customerPartyAccount.divList = [];
    this.partyMasterService.getAllsettings().subscribe((res: any) => {
      if (res.status == 'ok') this.userSettings = JSON.parse(res.result);
    });
    this.getParentGroupTree();
    this.ledgerForm = this.fb.group({
      AccountCode: ['', Validators.required],
      AccountType: ['', Validators.required],
      AccountName: ['', Validators.required],
      ParentGroup: ['', Validators.required],
      Category: ['', Validators.required],
      CreditLimit: ['', Validators.required],
      Tds: ['', Validators.required],
      ActivityType: ['', Validators.required],
      HasSubLedger: ['', Validators.required],
      AllBranches: ['', Validators.required],
    });

    this.displayedColumns = ['sn', 'branch', 'action'];
  }

  ngOnInit() {
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
    if (!!this._activatedRoute.snapshot.params['mode']) {
      if (this._activatedRoute.snapshot.params['mode'] === 'view') {
        this.mode = 'View';
        this.ledgerForm.disable();
      }
      if (this._activatedRoute.snapshot.params['mode'] === 'edit') {
        this.mode = 'edit';
      }
      let acid = this._activatedRoute.snapshot.params['acid'];
      this.partyMasterService
        .getCustomerById('A',acid).subscribe((res:any) => {
          if(res.status == "ok"){
            this.partyMasterService.customermasterObj = res.result;
            this.partyMasterService.customermasterObj.customerPartyAccount = res.result.customerPartyAccount;
            this.filterParentGroup(this.partyMasterService.customermasterObj.customerPartyAccount.acType);
            const hasSubLedgerValue = this.partyMasterService.customermasterObj.hasSubLedger || 0;
            this.ledgerForm.patchValue({ HasSubLedger: hasSubLedgerValue === 1 });
          }
          else if(res.status == "error"){
            this.partyMasterService.openErrorDialog(res.result);
          }
        },error => {
          this.partyMasterService.openErrorDialog(error.error.detail);
        })
    }
  }

  hasSubLedger(event: Event): void{
    const isChecked =(event.target as HTMLInputElement).checked;
    this.partyMasterService.customermasterObj.hasSubLedger =isChecked ? 1 : 0;
  }

  getSubMenu(item: any): any {
    return this[`menu_${item.name.replace(/\s+/g, '_')}`];
  }

  openDialog() {
    this.isOpen = true;
  }

  save() {
    this.isOpen = false; // Method to close the pop-up
  }

  close() {
    this.isOpen = false; // Method to close the pop-up
  }

  onSelectParent(event: any) {
    this.partyMasterService.customermasterObj.customerPartyAccount.parent =
      event.acid;
      this.partyMasterService.customermasterObj.customerPartyAccount.acType = event.acid;
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
    const selectedAccount = this.menuData.find((x:any) => x.acid == input.value);
    let selectedValue = selectedAccount ? selectedAccount.acname : '';
    this.partyMasterService.customermasterObj.customerPartyAccount.parent = selectedValue;
    this.partyMasterService.customermasterObj.parentGroup = selectedValue;
  }

  filterParentGroup(actype:string){
    this.ParentGroup = this.menuData.filter((x:any) => x.acid == actype);
  }

  submit() {
    if (
      this.partyMasterService.customermasterObj.customerCode == '' ||
      this.partyMasterService.customermasterObj.customerCode == undefined ||
      this.partyMasterService.customermasterObj.customerCode == null
    ) {
      alert('Please Enter Account Code.');
      return;
    }
    if (
      this.partyMasterService.customermasterObj.customerName == '' ||
      this.partyMasterService.customermasterObj.customerName == undefined ||
      this.partyMasterService.customermasterObj.customerName == null
    ) {
      alert('Please Enter Account Name.');
      return;
    }
    if (
      this.partyMasterService.customermasterObj.customerPartyAccount.acType ==
        '' ||
      this.partyMasterService.customermasterObj.customerPartyAccount.acType ==
        undefined ||
      this.partyMasterService.customermasterObj.customerPartyAccount.acType ==
        null
    ) {
      alert('Please Select Account Type.');
      return;
    }
    this.partyMasterService.customermasterObj.customerPartyAccount.type = 'A';
    this.partyMasterService.customermasterObj.customerPartyAccount.pType = 'A';
    this.partyMasterService.customermasterObj.customerPartyAccount.mapId =
      this.partyMasterService.customermasterObj.customerPartyAccount.category;
    this.partyMasterService
      .saveCustomer(this.mode, this.partyMasterService.customermasterObj)
      .subscribe((res: any) => {
        if (res.status == 'ok') {
          const dialogRef = this.partyMasterService.openSuccessDialog(res.result);
          setTimeout(() => {
            dialogRef.close();
          }, 2000);
          this.partyMasterService.customermasterObj = <CustomerMasterObj>{};
          this.partyMasterService.customermasterObj.AdditionalInfo = <AdditionalInfo>{};
          this.partyMasterService.customermasterObj.customerPartyAccount = <CustomerPartyAccountObj>{};
          this.router.navigate([this.returnUrl]); // Navigate to the previous route
        } else if (res.status == 'error') {
          this.partyMasterService.openErrorDialog(res.result);
        }
      },
      error => {
        this.partyMasterService.openErrorDialog(error.error.detail);
      });
  }

  goBack() {
    this.router.navigate([this.returnUrl]); // Navigate to the previous route
  }
}
