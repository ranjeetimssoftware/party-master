import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLedgerGroupComponent } from './create-ledger-group.component';

describe('CreateLedgerGroupComponent', () => {
  let component: CreateLedgerGroupComponent;
  let fixture: ComponentFixture<CreateLedgerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLedgerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLedgerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
