import React, { useState } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { addMerchant } from '../../services/MerchantService'; 
import '../../App.css';

const AddMerchantModal = (props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMerchant(e.target) 
      .then((result) => {
        alert(result);
        props.setIsUpdated(true);
        props.onHide();
      })
      .catch((error) => {
        setErrorMessage('Failed to Add Merchant');
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
            <h2 className="modal-title">New merchant</h2>
          </Modal.Title>
        </Modal.Header>

        <Form className="form-css" onSubmit={handleSubmit}>
          <Modal.Body>
            <input type="hidden" name="box_premium" value={0} />
            <input type="hidden" name="box_common" value={0} />

            <Row className="row-css">
              <Col sm={6}>
                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="first_name" required placeholder="" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="last_name" required placeholder="" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="row-css">
              <Col>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" required placeholder="" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="row-css">
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="email" required placeholder="" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <Form.Group controlId="phone_number">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" name="phone_number" required placeholder="" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="payment_method">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control type="text" name="payment_method" required placeholder="" />
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

export default AddMerchantModal;
