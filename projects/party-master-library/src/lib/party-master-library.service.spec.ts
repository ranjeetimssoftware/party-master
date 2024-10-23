import { TestBed } from '@angular/core/testing';

import { PartyMasterLibraryService } from './party-master-library.service';

describe('PartyMasterLibraryService', () => {
  let service: PartyMasterLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyMasterLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
