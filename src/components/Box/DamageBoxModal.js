import React, { useState, useEffect } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { damageBox } from '../../services/BoxService';
import '../../App.css';

const DamageBoxModal = (props) => {
	const [errorMessage, setErrorMessage] = useState("");
  const [damageValue, setDamageValue] = useState(0); 
  const [newDamageValue, setNewDamageValue] = useState(props.box.damaged_box_qtt);
  const [borrowedMerchantValue, setBorrowedMerchantValue] = useState(props.box.borrowed_merchant);
  const [borrowedProducerValue, setBorrowedProducerValue] = useState(props.box.borrowed_producer);

  let total;
  let storehouse;

  if (damageValue) { 
    total = parseInt(props.box.qtt_total) - parseInt(damageValue); 
    storehouse = props.box.box_qtt - parseInt(damageValue);
  } else {
    total = props.box.qtt_total;
    storehouse = props.box.box_qtt;
  }

  if (borrowedProducerValue || borrowedMerchantValue || damageValue) { 
    if (borrowedProducerValue && borrowedMerchantValue) {
      storehouse = total - borrowedProducerValue - borrowedMerchantValue;
    } else if (borrowedProducerValue) {
      storehouse = total - borrowedProducerValue - props.box.borrowed_merchant;
    } else if (borrowedMerchantValue) {
      storehouse = total - props.box.borrowed_producer - borrowedMerchantValue;
    } else if (borrowedProducerValue && borrowedMerchantValue) {
      storehouse = total - borrowedProducerValue - borrowedMerchantValue;
    }
  }

	const handleSubmit = (e) => {
    e.preventDefault();
    damageBox(props.box.box_type, e.target, borrowedMerchantValue, borrowedProducerValue)
      .then((result) => {
        alert(result);
        props.setIsUpdated(true);
        props.onHide();
				setDamageValue(0);
      })
      .catch((error) => {
        setErrorMessage("Failed to Update Box");
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
        <Modal.Header className="header-modal" closeButton>
          <Modal.Title className="header-modal" id="contained-modal-title-vcenter">
            <h2 className="modal-title">Edit {props.box.box_type} boxes</h2>
          </Modal.Title>
        </Modal.Header>

        <Form className="form-css" onSubmit={handleSubmit}>
          <Modal.Body>
            <input type="hidden" name="qtt_total" value={total} />
            <input type="hidden" name="box_qtt" value={storehouse} />
						<input type="hidden" name="new_boxes" value={0} />
            <input type="hidden" name="borrowed_producer" value={props.box.borrowed_producer} />
            <input type="hidden" name="borrowed_merchant" value={props.box.borrowed_merchant} />
            

            <Row className="row-css">
              <Col sm={6}>
                <Form.Group controlId="qtt_total">
                  <Form.Label>Total</Form.Label>
                  <br />
                  <p className="p-css p-name">{total}</p>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group controlId="box_qtt">
                  <Form.Label>Storehouse</Form.Label>
                  <br />
                  <p className="p-css p-name">{storehouse}</p>
                </Form.Group>
              </Col>
            </Row>

            <Row className="row-css">

              <Col sm={6}>
                <Form.Group controlId="damaged_box_qtt">
                  <Form.Label>Damage</Form.Label>
                  <Form.Control
                    type="number"
                    name="damaged_box_qtt"
                    required
                    value={damageValue}
                    onChange={(e) => {
                      setDamageValue(e.target.value);

                    }}
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

export default DamageBoxModal;
