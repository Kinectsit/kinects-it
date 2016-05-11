import * as types from '../constants/actionTypes';

export function setUser(user) {
  return { type: types.SET_USER, user };
}

export function addDevice(configuredDevice) {
  return { type: types.ADD_DEVICE, configuredDevice };
}

export function setFeatured(device) {
  return { type: types.SET_FEATURED, device };
}

export function setupDeviceOptions(device) {
  return { type: types.SETUP_DEVICE_OPTIONS, device };
}

export function addRental(rental) {
  return { type: types.ADD_RENTAL, rental };
}
