import axios from 'axios';

export function getMerchants() {
  return axios.get('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants/')
    .then(response => response.data);
}

export function getMerchant(merchantId) {
  return axios.get('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants/' + merchantId + '/')
    .then(response => response.data);
}

export function deleteMerchant(merchantId) {
  return axios.delete('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants/' + merchantId + '/', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.data);
}

export function addMerchant(merchant) {
  return axios.post('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants/', {
    merchantId: null,
    first_name: merchant.first_name.value,
    last_name: merchant.last_name.value,
    address: merchant.address.value,
    email: merchant.email.value,
    phone_number: merchant.phone_number.value,
    payment_method: merchant.payment_method.value,
    box_premium: merchant.box_premium.value,
    box_common: merchant.box_common.value,
  })
  .then(response => response.data);
}

export function updateMerchant(merchantId, merchant) {
  let updateMerchant;
  if (typeof merchant.first_name === 'object') {
    updateMerchant = {
      first_name: merchant.first_name.value,
      last_name: merchant.last_name.value,
      address: merchant.address.value,
      email: merchant.email.value,
      phone_number: merchant.phone_number.value,
      payment_method: merchant.payment_method.value,
      box_premium: merchant.box_premium.value,
      box_common: merchant.box_common.value,
    };
  } else {
    updateMerchant = {
      first_name: merchant.first_name,
      last_name: merchant.last_name,
      address: merchant.address,
      email: merchant.email,
      phone_number: merchant.phone_number,
      payment_method: merchant.payment_method,
      box_premium: merchant.box_premium,
      box_common: merchant.box_common,
    };
  }
  return axios
    .put('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants/' + merchantId + '/', updateMerchant)
    .then(response => response.data);
}
