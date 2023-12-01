import axios from 'axios';

export function getMerchantsTransactions() {
  return axios.get('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants-transactions/')
    .then(response => response.data);
}

export function deleteMerchantTransaction(merchantTransactionId, merchantTransaction) {
  return axios.delete('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants-transactions/' + merchantTransactionId + '/', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.data);
}

export function addMerchantTransaction(merchantTransaction) {
  return axios.post('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants-transactions/', {
    merchant: merchantTransaction.merchant.value,
    merchant_name: merchantTransaction.merchant_name,
    date: merchantTransaction.selectedDate,
    transaction_type: merchantTransaction.transaction_type.value,
    box_type: merchantTransaction.box_type.value,
    box_qtt: merchantTransaction.box_qtt.value,
    price: merchantTransaction.price.value,
  })
    .then(response => response.data);
}

export function updateMerchantTransaction(merchantTransactionId, merchantTransaction) {
  return axios.put('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/merchants-transactions/' + merchantTransactionId + '/', {
    merchant: merchantTransaction.merchant.value,
    merchant_name: merchantTransaction.merchant_name,
    date: merchantTransaction.selectedDate,
    transaction_type: merchantTransaction.transaction_type.value,
    box_type: merchantTransaction.box_type.value,
    box_qtt: merchantTransaction.box_qtt.value,
    price: merchantTransaction.price.value,
  })
    .then(response => response.data);
}
