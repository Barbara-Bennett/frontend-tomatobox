import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateProducer } from '../../services/ProducerService';

const UpdateProducerModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProducer(props.producer.producerId, e.target)
        .then((result)=>{
					console.log("result:", result)
					console.log(props.producer.producerId)
            alert(result);
            props.setIsUpdated(true);
        },
        (error)=>{
            alert("Failed to Update Producer");
        })
    };

    return(
		<div className="container">
				
			<Modal className="container" 
				{...props}
				size="mg"
				aria-labelledby="contained-modal-title-vcenter"
				centered>

				<Modal.Header className='header-modal' closeButton>
						<Modal.Title className='header-modal' id="contained-modal-title-vcenter">
							<h2 className="modal-title">Edit producer</h2> 
						</Modal.Title>
				</Modal.Header>

				<Form className='form-css' onSubmit={handleSubmit}>
					<Modal.Body>

					<input type="hidden" name="box_premium" value={props.producer.box_premium} />
					<input type="hidden" name="box_common" value={props.producer.box_common} />

					<Row className='row-css'>
						<Col sm={6}>
							<Form.Group controlId="first_name">
								<Form.Label>First Name</Form.Label>
								<Form.Control type="text" name="first_name" required defaultValue={props.producer.first_name} placeholder="" />
							</Form.Group>
						</Col>
						<Col sm={6}>
							<Form.Group controlId="last_name">
								<Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="last_name" required defaultValue={props.producer.last_name} placeholder="" />
							</Form.Group>
						</Col>
  				</Row>
					<Row className='row-css'>
						<Col>
							<Form.Group controlId="address">
								<Form.Label>Address</Form.Label>
								<Form.Control type="text" name="address" required defaultValue={props.producer.address} placeholder="" />
							</Form.Group>
							</Col>
  				</Row>
					<Row className='row-css'>
						<Col>
							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="email" required defaultValue={props.producer.email} placeholder="" />
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col sm={6}>
							<Form.Group controlId="phone_number">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control type="text" name="phone_number" required defaultValue={props.producer.phone_number} placeholder="" />
							</Form.Group>
							</Col>
							<Col sm={6}>
							<Form.Group controlId="payment_method">
								<Form.Label>Payment Method</Form.Label>
                <Form.Control type="text" name="payment_method" required defaultValue={props.producer.payment_method} placeholder="" />
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

export default UpdateProducerModal;

