import { expect, test } from 'bun:test';

import { youreit } from './index';

test('youreit should work', () => {
    expect(youreit()).toBe('youreit');
});
