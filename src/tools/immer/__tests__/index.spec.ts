import { describe, expect, it } from 'vitest';
import { produce } from '../index';

describe('simple immer', () => {
  it('should be not same when recipe change baseState', () => {
    const baseState = {
      a: 1,
      b: 2,
    };

    const nextState = produce(baseState, (draft) => {
      draft.a = 3;
    });

    expect(nextState).not.toBe(baseState);
    expect(nextState.a).toBe(3);
    expect(nextState.b).toBe(baseState.b);
  });

  it('should be same when recipe not change baseState', () => {
    const baseState = {
      a: 1,
      b: 2,
    };

    const nextState = produce(baseState, (draft) => {

    });

    expect(nextState).toBe(baseState);
  });
});
