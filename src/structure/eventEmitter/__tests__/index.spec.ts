import { beforeEach, describe, expect, it, vi } from 'vitest';
import Emitter from '../index';

describe('event emitter', () => {
  let emitter: Emitter;

  beforeEach(() => {
    emitter = new Emitter();
  });

  it('should "on" work', () => {
    const fn = vi.fn();
    emitter.on('fn', fn);

    emitter.emit('fn');

    expect(fn).toBeCalled();
  });

  it('should "once" work', () => {
    const fn = vi.fn();
    emitter.once('fn', fn);

    emitter.emit('fn');

    expect(fn).toBeCalledTimes(1);

    emitter.emit('fn');

    expect(fn).toBeCalledTimes(1);
  });

  it('should "off" work on all functions', () => {
    const fn = vi.fn();
    const fn1 = vi.fn();
    emitter.on('fn', fn);
    emitter.on('fn', fn1);

    emitter.off('fn');

    emitter.emit('fn');

    expect(fn).not.toBeCalled();
    expect(fn1).not.toBeCalled();
  });

  it('should "off" work on specified function', () => {
    const fn = vi.fn();
    const fn1 = vi.fn();
    emitter.on('fn', fn);
    emitter.on('fn', fn1);

    emitter.off('fn', fn);

    emitter.emit('fn');

    expect(fn).not.toBeCalled();
    expect(fn1).toBeCalled();
  });
});
