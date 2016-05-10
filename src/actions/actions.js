import * as types from '../constants/actionTypes';

export function setUser(user) {
  return { type: types.SET_USER, user };
}

export function addDevice(enabledDevice) {
  return { type: types.ADD_DEVICE, enabledDevice };
}

export function setFeatured(device) {
  return { type: types.SET_FEATURED, device };
}

export function setupDevice(device) {
  return { type: types.SETUP_DEVICE, device };
}

export function addRental(rental) {
  return { type: types.ADD_RENTAL, rental };
}
