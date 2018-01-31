import { TestBed, inject } from '@angular/core/testing';

import { LoadXmlService } from './load-xml.service';

describe('LoadXmlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadXmlService]
    });
  });

  it('should be created', inject([LoadXmlService], (service: LoadXmlService) => {
    expect(service).toBeTruthy();
  }));
});
