import { types } from './types';

import { describe, expect, test } from 'bun:test';

describe('types', () => {
    test('should work', () => {
        expect(types()).toEqual('types');
    });
});
