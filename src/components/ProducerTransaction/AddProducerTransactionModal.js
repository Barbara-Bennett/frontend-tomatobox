import React, { useState, useEffect } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormGroup, FormLabel } from "react-bootstrap";
import { addProducerTransaction } from "../../services/ProducerTransactionService";
import { getProducers } from "../../services/ProducerService";
import { getBox, addNewBox } from "../../services/BoxService";
import { getProducer, updateProducer } from "../../services/ProducerService";
import "../../App.css";

const AddProducerTransactionModal = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [producers, setProducers] = useState([]);
  const [showLendErrorMessage, setShowLendErrorMessage] = useState(false);
  const [showDevErrorMessage, setShowDevErrorMessage] = useState(false);

  useEffect(() => {
    fetchProducers();
  }, []);

  useEffect(() => {
    if (props.show) {
      setShowLendErrorMessage(false);
      setShowDevErrorMessage(false);
    }
  }, [props.show]);

  const fetchProducers = () => {
    getProducers()
      .then((producers) => {
        setProducers(producers);
      })
      .catch((error) => {
        console.error("Failed to fetch producers:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLendErrorMessage(false);
    setShowDevErrorMessage(false);

    const formData = new FormData(e.target);

    try {
      const boxData = await getBox(formData.get("box_type"));
      const getBoxAxios = boxData;
      const producersData = await getProducer(formData.get("producer"));
      const getProducerAxios = producersData;

      if (
        formData.get("transaction_type") === "lend" &&
        parseInt(formData.get("box_qtt")) > getBoxAxios.box_qtt
      ) {
        setShowLendErrorMessage(true);
        return;
      }
      if (
        formData.get("transaction_type") === "devolution" &&
        parseInt(formData.get("box_qtt")) >
          getBoxAxios.qtt_total - getBoxAxios.box_qtt
      ) {
        setShowDevErrorMessage(true);
        return;
      }

      const result = await addProducerTransaction(e.target);

      if (formData.get("transaction_type") === "lend") {
        getBoxAxios.borrowed_producer += parseInt(formData.get("box_qtt"));
        getBoxAxios.box_qtt -= parseInt(formData.get("box_qtt"));
      } else if (formData.get("transaction_type") === "devolution") {
        getBoxAxios.borrowed_producer -= parseInt(formData.get("box_qtt"));
        getBoxAxios.box_qtt += parseInt(formData.get("box_qtt"));
      }

      await addNewBox(formData.get("box_type"), getBoxAxios);

      if (
        formData.get("transaction_type") === "lend" &&
        formData.get("box_type") === "premium"
      ) {
        getProducerAxios.box_premium += parseInt(formData.get("box_qtt"));
      } else if (
        formData.get("transaction_type") === "devolution" &&
        formData.get("box_type") === "premium"
      ) {
        getProducerAxios.box_premium -= parseInt(formData.get("box_qtt"));
      }

      if (
        formData.get("transaction_type") === "lend" &&
        formData.get("box_type") === "common"
      ) {
        getProducerAxios.box_common += parseInt(formData.get("box_qtt"));
      } else if (
        formData.get("transaction_type") === "devolution" &&
        formData.get("box_type") === "common"
      ) {
        getProducerAxios.box_common -= parseInt(formData.get("box_qtt"));
      }

      await updateProducer(formData.get("producer"), getProducerAxios);

      props.setIsUpdated(true);
      props.onHide();
    } catch (error) {
      setErrorMessage("Failed to add producer transaction:", error);
    }
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
          <Modal.Title
            className="header-modal"
            id="contained-modal-title-vcenter"
          >
            <h2 className="modal-title">New producer transaction</h2>
          </Modal.Title>
        </Modal.Header>

        <Form className="form-css" onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="row-css">
              <Col>
                <FormGroup controlId="producer">
                  <FormLabel>Producer</FormLabel>
                  <Form.Select name="producer" required defaultValue="">
                    <option value="" disabled>
                      Choose a producer
                    </option>
                    {producers.map((producer) => (
                      <option
                        key={producer.producerId}
                        value={producer.producerId}
                      >
                        {`${producer.first_name} ${producer.last_name}`}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Col>
            </Row>

            <Row className="row-css">
              <Col sm={6}>
                <Form.Group controlId="transaction_type">
                  <Form.Label>Transaction</Form.Label>
                  <Form.Select name="transaction_type" required defaultValue="">
                    <option value="" disabled></option>
                    <option value="lend">Lend</option>
                    <option value="devolution">Devolution</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="box_type">
                  <Form.Label>Box type</Form.Label>
                  <Form.Select name="box_type" required defaultValue="">
                    <option value="" disabled></option>
                    <option value="premium">Premium</option>
                    <option value="common">Common</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="row-css">
              <Col sm={6}>
                <Form.Group controlId="box_qtt">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="box_qtt"
                    required
                    placeholder=""
                    min="0"
                  />
                </Form.Group>
                {showLendErrorMessage && (
                  <p className="error-message">
                    more box than there is in the storehouse
                  </p>
                )}
                {showDevErrorMessage && (
                  <p className="error-message">
                    more box than there is with producers
                  </p>
                )}
              </Col>

              <Col sm={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    required
                    placeholder=""
                    min="0"
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

            <Button variant="danger" type="button" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
        {errorMessage && <p>{errorMessage}</p>}
      </Modal>
    </div>
  );
};

export default AddProducerTransactionModal;
