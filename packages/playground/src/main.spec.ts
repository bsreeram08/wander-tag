import { expect, test } from 'bun:test';

import { playground } from './index';

test('playground should work', () => {
    expect(playground()).toBe('playground');
});
