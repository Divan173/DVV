import { TestBed, inject } from '@angular/core/testing';

import { TablesOfHallService } from './tables-of-hall.service';

describe('TablesOfHallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablesOfHallService]
    });
  });

  it('should be created', inject([TablesOfHallService], (service: TablesOfHallService) => {
    expect(service).toBeTruthy();
  }));
});
