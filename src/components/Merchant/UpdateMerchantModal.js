import React, { Component } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { updateMerchant } from '../../services/MerchantService'; 

const UpdateMerchantModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMerchant(props.merchant.merchantId, e.target)
            .then((result) => {
                console.log("result:", result)
                console.log(props.merchant.merchantId)
                alert(result);
                props.setIsUpdated(true);
            },
            (error) => {
                alert("Failed to Update Merchant");
            })
    };

    return (
        <div className="container">
            <Modal className="container"
                {...props}
                size="mg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header className='header-modal' closeButton>
                    <Modal.Title className='header-modal' id="contained-modal-title-vcenter">
                        <h2 className="modal-title">Edit merchant</h2>
                    </Modal.Title>
                </Modal.Header>

                <Form className='form-css' onSubmit={handleSubmit}>
                    <Modal.Body>

                        <input type="hidden" name="box_premium" value={props.merchant.box_premium} />
                        <input type="hidden" name="box_common" value={props.merchant.box_common} />

                        <Row className='row-css'>
                            <Col sm={6}>
                                <Form.Group controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="first_name" required defaultValue={props.merchant.first_name} placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="last_name" required defaultValue={props.merchant.last_name} placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='row-css'>
                            <Col>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" name="address" required defaultValue={props.merchant.address} placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='row-css'>
                            <Col>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" required defaultValue={props.merchant.email} placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Group controlId="phone_number">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" name="phone_number" required defaultValue={props.merchant.phone_number} placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group controlId="payment_method">
                                    <Form.Label>Payment Method</Form.Label>
                                    <Form.Control type="text" name="payment_method" required defaultValue={props.merchant.payment_method} placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Form.Group>
                            <Button variant="success" type="submit" onClick={props.onHide}>
                                Submit
                            </Button>
                        </Form.Group>
                        <Button variant="danger" type="submit" onClick={props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default UpdateMerchantModal;
