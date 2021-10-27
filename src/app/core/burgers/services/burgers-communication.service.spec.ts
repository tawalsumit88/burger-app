import { TestBed } from '@angular/core/testing';

import { BurgersCommunicationService } from './burgers-communication.service';

describe('BurgersCommunicationService', () => {
  let service: BurgersCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurgersCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
