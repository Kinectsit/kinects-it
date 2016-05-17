import * as types from '../constants/actionTypes';

export function loadDevices(devices) {
  return { type: types.LOAD_DEVICES, devices };
}

export function setUser(user) {
  return { type: types.SET_USER, user };
}

export function loadPayAccounts(payAccounts) {
  return { type: types.LOAD_PAY_ACCOUNTS, payAccounts };
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

export function toggleDevice(isactive) {
  return { type: types.TOGGLE_DEVICE, isactive };
}

export function paidUsage(paidusage) {
  return { type: types.PAID_USAGE, paidusage };
}

export function addRental(rentalId) {
  return { type: types.ADD_RENTAL, rentalId };
}

export function addHouse(house) {
  return { type: types.ADD_HOUSE, house };
}

export function setUserAsHost(isHost) {
  return { type: types.SET_USER_AS_HOST, isHost };
}

export function setAuthentication(isAuthenticated, sessionId) {
  return { type: types.SET_AUTHENTICATION, isAuthenticated, sessionId };
}
