import React, { useState, useEffect } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { addNewBox } from '../../services/BoxService';
import '../../App.css';

const AddNewBoxModal = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [newBoxesValue, setNewBoxesValue] = useState(0);
  const borrowedMerchantValue = props.box.borrowed_merchant;
  const borrowedProducerValue = props.box.borrowed_producer;

  let total;
  let storehouse;
  if (newBoxesValue) {
    total = parseInt(newBoxesValue) + parseInt(props.box.qtt_total);
    storehouse = parseInt(newBoxesValue) + parseInt(props.box.box_qtt);
  } 
  else {
    total = props.box.qtt_total;
    storehouse = props.box.box_qtt;
  }

  if (borrowedProducerValue || borrowedMerchantValue || newBoxesValue) {
    if (borrowedProducerValue && borrowedMerchantValue) {
      storehouse = total - borrowedProducerValue - borrowedMerchantValue;
    } else if (borrowedProducerValue) {
      storehouse = total - borrowedProducerValue - props.box.borrowed_merchant;
    } else if (borrowedMerchantValue) {
      storehouse = total - props.box.borrowed_producer - borrowedMerchantValue;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewBox(props.box.box_type, e.target, borrowedMerchantValue, borrowedProducerValue)
      .then((result) => {
        alert(result);
        props.setIsUpdated(true);
        props.onHide();
        setNewBoxesValue(0)
      })
      .catch((error) => {
        setErrorMessage("Failed to Add New Box");
      });
  };

  return (
    <div className="container">
      <Modal
        className="container modals"
        {...props}
        size="mg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='header-modal' closeButton>
          <Modal.Title className='header-modal' id="contained-modal-title-vcenter">
            <h2 className="modal-title">Add new {props.box.box_type} boxes</h2>
          </Modal.Title>
        </Modal.Header>

        <Form className='form-css' onSubmit={handleSubmit}>

          <Modal.Body>
            <input type="hidden" name="qtt_total" value={total} />
            <input type="hidden" name="box_qtt" value={storehouse} />
            <input type="hidden" name="damaged_box_qtt" value={0} />
            <input type="hidden" name="borrowed_producer" value={props.box.borrowed_producer} />
            <input type="hidden" name="borrowed_merchant" value={props.box.borrowed_merchant} />

            <Row className='row-css'>
              <Col sm={6}>
                <Form.Group controlId="qtt_total">
                  <Form.Label>Total</Form.Label>
                  <br />
                  <p className='p-css p-name'>{total}</p>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group controlId="box_qtt">
                  <Form.Label>Storehouse</Form.Label>
                  <br />
                  <p className='p-css p-name'>{storehouse}</p>
                </Form.Group>
              </Col>
            </Row>

            <Row className='row-css'>
              <Col sm={6}>
                <Form.Group controlId="new_boxes">
                  <Form.Label>New Boxes</Form.Label>
                  <Form.Control
                    type="number"
                    name="new_boxes"
                    required
                    value={newBoxesValue}
                    onChange={(e) => { setNewBoxesValue(e.target.value) }}
                  />
                </Form.Group>
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form.Group>
            <Button variant="danger" type="submit" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
        {errorMessage && <p>{errorMessage}</p>}
      </Modal>
    </div>
  );
};

export default AddNewBoxModal;
