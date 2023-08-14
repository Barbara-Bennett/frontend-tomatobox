import axios from 'axios';

export function getProducersTransactions() {
  return axios.get('https://tomatobox-backend-4j2l.onrender.com/producers-transactions/')
    .then(response => response.data)
    
}


export function deleteProducerTransaction(producerTransactionId, producerTransaction) {
  return axios.delete('https://tomatobox-backend-4j2l.onrender.com/producers-transactions/' + producerTransactionId + '/', {
  method: 'DELETE',
  headers: {
    'Accept':'application/json',
    'Content-Type':'application/json'
  }
  })
  .then(response => response.data)
}


export function addProducerTransaction(producerTransaction){
  return axios.post('https://tomatobox-backend-4j2l.onrender.com/producers-transactions/', {
    producer:producerTransaction.producer.value,
    producer_name:producerTransaction.producer_name,
    date: producerTransaction.selectedDate,
    transaction_type:producerTransaction.transaction_type.value,
    box_type:producerTransaction.box_type.value,
    box_qtt:producerTransaction.box_qtt.value,
    price:producerTransaction.price.value,
  })
    .then(response=>response.data)
}

export function updateProducerTransaction(producerTransactionId, producerTransaction) {
  return axios.put('https://tomatobox-backend-4j2l.onrender.com/producers-transactions/' + producerTransactionId + '/', {
    producer:producerTransaction.producer.value,
    producer_name:producerTransaction.producer_name,
    date: producerTransaction.selectedDate,
    transaction_type:producerTransaction.transaction_type.value,
    box_type:producerTransaction.box_type.value,
    box_qtt:producerTransaction.box_qtt.value,
    price:producerTransaction.price.value,
  })
    .then(response=>response.data)
}
