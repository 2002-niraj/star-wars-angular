import { TestBed } from '@angular/core/testing';

import { CharacterlistService } from './characterlist.service';

describe('CharacterlistService', () => {
  let service: CharacterlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
