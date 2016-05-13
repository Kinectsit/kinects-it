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

export function toggleDevice(isActive) {
  return { type: types.TOGGLE_DEVICE, isActive };
}

export function paidUsage(hasPaid) {
  return { type: types.PAID_USAGE, hasPaid };
}

export function addRental(rental) {
  return { type: types.ADD_RENTAL, rental };
}

export function addHouse(house) {
  return { type: types.ADD_HOUSE, house };
}

export function setUserAsHost(isHost) {
  return { type: types.SET_USER_AS_HOST, isHost };
}

export function setAsAuthenticated(isAuthenticated, sessionId) {
  return { type: types.LOGIN_SUCCESS, isAuthenticated, sessionId };
}
