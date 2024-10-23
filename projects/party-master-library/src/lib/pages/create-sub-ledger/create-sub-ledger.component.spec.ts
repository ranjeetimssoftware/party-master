import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubLedgerComponent } from './create-sub-ledger.component';

describe('CreateSubLedgerComponent', () => {
  let component: CreateSubLedgerComponent;
  let fixture: ComponentFixture<CreateSubLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
