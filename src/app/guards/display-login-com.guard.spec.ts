import { TestBed } from '@angular/core/testing';

import { DisplayLoginComGuard } from './display-login-com.guard';

describe('DisplayLoginComGuard', () => {
  let guard: DisplayLoginComGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DisplayLoginComGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
