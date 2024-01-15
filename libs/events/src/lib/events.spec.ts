import { events } from './events';

import { describe, expect, test } from 'bun:test';

describe('events', () => {
    test('should work', () => {
        expect(events()).toEqual('events');
    });
});
