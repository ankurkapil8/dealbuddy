import { TestBed } from '@angular/core/testing';

import { Utils2Service } from './utils2.service';

describe('Utils2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Utils2Service = TestBed.get(Utils2Service);
    expect(service).toBeTruthy();
  });
});
