import { TestBed } from '@angular/core/testing';

import { BasicSearchService } from './basic-search.service';

describe('BasicSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicSearchService = TestBed.get(BasicSearchService);
    expect(service).toBeTruthy();
  });
});
