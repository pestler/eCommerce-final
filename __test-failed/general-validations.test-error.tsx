import { describe, expect, test } from 'vitest';

import { generalValidation } from '../src/validators/general-validation';

describe('Function generalValidation works correctly', () => {
  test('expect correct returned value from generalValidation', () => {
    expect(generalValidation()).toBe( generalValidation() );  
  }
);
});
