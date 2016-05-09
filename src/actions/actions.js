import * as types from '../constants/actionTypes';

export function setUser(user) {
  return { type: types.SET_USER, user };
}

export function addDevice(device) {
  return { type: types.ADD_DEVICE, device };
}

export function addRental(rental) {
  return { type: types.ADD_RENTAL, rental };
}
