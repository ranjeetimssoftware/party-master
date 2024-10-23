import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMasterLibraryComponent } from './party-master-library.component';

describe('PartyMasterLibraryComponent', () => {
  let component: PartyMasterLibraryComponent;
  let fixture: ComponentFixture<PartyMasterLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyMasterLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMasterLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
