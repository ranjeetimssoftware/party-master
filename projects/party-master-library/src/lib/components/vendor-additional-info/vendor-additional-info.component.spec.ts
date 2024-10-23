import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdditionalInfoComponent } from './vendor-additional-info.component';

describe('VendorAdditionalInfoComponent', () => {
  let component: VendorAdditionalInfoComponent;
  let fixture: ComponentFixture<VendorAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAdditionalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
