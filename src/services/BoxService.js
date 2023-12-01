import axios from 'axios';

export function getBoxes() {
  return axios.get('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/boxes/')
    .then(response => response.data)
}

export function getBox(box_type) {
  return axios.get('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/boxes/' + box_type + '/')
    .then(response => response.data)
}

export function deleteBox(box_type) {
  return axios.delete('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/boxes/' + box_type + '/', {
  method: 'DELETE',
  headers: {
    'Accept':'application/json',
    'Content-Type':'application/json'
  }
  })
  .then(response => response.data)
}

export function addBox(box){
  return axios.post('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/boxes/', {
    box_type:box.box_type.value,
    new_boxes:box.new_boxes.value,
    qtt_total:box.qtt_total.value,
    box_qtt:box.box_qtt.value,
    damaged_box_qtt:box.damaged_box_qtt.value,
    borrowed_producer:box.borrowed_producer.value,
    borrowed_merchant:box.borrowed_merchant.value,
  })
    .then(response=>response.data)
}   

export function addNewBox(box_type, box) {
  let addNewdBox;
  if (typeof box.new_boxes === 'object') {
    addNewdBox = {
      box_type: box_type,
      new_boxes: box.new_boxes.value,
      qtt_total: box.qtt_total.value,
      box_qtt: box.box_qtt.value,
      damaged_box_qtt: box.damaged_box_qtt.value,
      borrowed_producer: box.borrowed_producer.value,
      borrowed_merchant: box.borrowed_merchant.value,
    };
  } else {
    addNewdBox = {
      box_type: box_type,
      new_boxes: box.new_boxes,
      qtt_total: box.qtt_total,
      box_qtt: box.box_qtt,
      damaged_box_qtt: box.damaged_box_qtt,
      borrowed_producer: box.borrowed_producer,
      borrowed_merchant: box.borrowed_merchant,
    };
  }

  console.log({ addNewdBox });
  
  return axios
    .put('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/boxes/' + box_type + '/', addNewdBox)
    .then((response) => response.data);
}

export function damageBox(box_type, box) {
  let damageBox;
  if (typeof box.new_boxes === 'object') {
    damageBox = {
      box_type: box_type,
      new_boxes: box.new_boxes.value,
      qtt_total: box.qtt_total.value,
      box_qtt: box.box_qtt.value,
      damaged_box_qtt: box.damaged_box_qtt.value,
      borrowed_producer: box.borrowed_producer.value,
      borrowed_merchant: box.borrowed_merchant.value,
    };
  } else {
    damageBox = {
      box_type: box_type,
      new_boxes: box.new_boxes,
      qtt_total: box.qtt_total,
      box_qtt: box.box_qtt,
      damaged_box_qtt: box.damaged_box_qtt,
      borrowed_producer: box.borrowed_producer,
      borrowed_merchant: box.borrowed_merchant,
    };
  }

  console.log({ damageBox });
  
  return axios
    .put('https://backend-tomatobox-dcb46be1ee44.herokuapp.com/boxes/' + box_type + '/', damageBox)
    .then((response) => response.data);
}
