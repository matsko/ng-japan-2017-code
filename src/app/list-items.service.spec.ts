import { TestBed, inject } from '@angular/core/testing';

import { ListItemsService } from './list-items.service';

describe('ListItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListItemsService]
    });
  });

  it('should be created', inject([ListItemsService], (service: ListItemsService) => {
    expect(service).toBeTruthy();
  }));
});
