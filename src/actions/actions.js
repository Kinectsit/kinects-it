import * as types from './actionTypes';

export function increment(number) {
  return { type: types.INCREMENT, number };
}

export function decrement(number) {
  return { type: types.DECREMENT, number };
}
