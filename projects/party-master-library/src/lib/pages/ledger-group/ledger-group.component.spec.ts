import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerGroupComponent } from './ledger-group.component';

describe('LedgerGroupComponent', () => {
  let component: LedgerGroupComponent;
  let fixture: ComponentFixture<LedgerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
