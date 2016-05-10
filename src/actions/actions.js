import * as types from '../constants/actionTypes';
import $ from 'jquery';

export function setUser(user) {
  return { type: types.SET_USER, user };
}

export function addDevice(device) {
  return { type: types.ADD_DEVICE, device };
}

export function setFeatured(device) {
  return { type: types.SET_FEATURED, device };
}

export function setupDevice(device) {
  // need to get the house ID from the store to send in

  // POST request to see if can connect to device
  $.post('http://localhost:3001/api/v1/devices/:id', (data) => {
    console.log('Successful device setup call:, ' + data);
  })
  .done((data) => {
    console.log('May not need');
  })
  .fail((error) => {
    console.log('Error posting device setup: ', error);
  })
  .always(() => {
    console.log('Finished device setup');
  });
  return { type: types.SETUP_DEVICE, device };
}

export function addRental(rental) {
  return { type: types.ADD_RENTAL, rental };
}
