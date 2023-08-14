import axios from 'axios';

export function getProducers() {
  return axios.get('https://tomatobox-backend-4j2l.onrender.com/producers/')
    .then(response => response.data)
}

export function getProducer(producerId) {
  return axios.get('https://tomatobox-backend-4j2l.onrender.com/producers/' + producerId + '/')
    .then(response => response.data)
}


export function deleteProducer(producerId) {
  return axios.delete('https://tomatobox-backend-4j2l.onrender.com/producers/' + producerId + '/', {
  method: 'DELETE',
  headers: {
    'Accept':'application/json',
    'Content-Type':'application/json'
  }
  })
  .then(response => response.data)
}


export function addProducer(producer){
  console.log("Aqui, agora, sou eu dentro do metodo addProducer")
  console.log(producer)
  return axios.post('https://tomatobox-backend-4j2l.onrender.com/producers/', {
    producerId:null,
    first_name:producer.first_name.value,
    last_name:producer.last_name.value,
    address:producer.address.value,
    email:producer.email.value,
    phone_number:producer.phone_number.value,
    payment_method:producer.payment_method.value,
    box_premium:producer.box_premium.value,
    box_common:producer.box_common.value,
  })
    .then(response=>response.data)
}


export function updateProducer(producerId, producer) {
  let updateProducer;
  if (typeof producer.first_name === 'object') {
    updateProducer = {
        first_name:producer.first_name.value,
        last_name:producer.last_name.value,
        address:producer.address.value,
        email:producer.email.value,
        phone_number:producer.phone_number.value,
        payment_method:producer.payment_method.value,
        box_premium:producer.box_premium.value,
        box_common:producer.box_common.value,
    };
  } else {
    updateProducer = {
      first_name:producer.first_name,
      last_name:producer.last_name,
      address:producer.address,
      email:producer.email,
      phone_number:producer.phone_number,
      payment_method:producer.payment_method,
      box_premium:producer.box_premium,
      box_common:producer.box_common,
  };
  }
  return axios
  .put('https://tomatobox-backend-4j2l.onrender.com/producers/' + producerId + '/', updateProducer)
  .then(response => response.data)
}