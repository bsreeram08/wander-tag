import { typeUtils } from './type-utils';

import { describe, expect, test } from 'bun:test';

describe('typeUtils', () => {
    test('should work', () => {
        expect(typeUtils()).toEqual('type-utils');
    });
});
