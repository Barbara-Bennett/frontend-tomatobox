import React, { useState, useEffect } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { addMerchantTransaction } from "../../services/MerchantTransactionService";
import { getMerchants } from "../../services/MerchantService";
import { getBox, addNewBox } from "../../services/BoxService";
import { getMerchant, updateMerchant } from "../../services/MerchantService";
import "../../App.css";

const AddMerchantTransactionModal = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [merchants, setMerchants] = useState([]);
  const [showLendErrorMessage, setShowLendErrorMessage] = useState(false);
  const [showDevErrorMessage, setShowDevErrorMessage] = useState(false);

  useEffect(() => {
    fetchMerchants();
  }, []);

  useEffect(() => {
    if (props.show) {
      setShowLendErrorMessage(false);
      setShowDevErrorMessage(false);
    }
  }, [props.show]);

  const fetchMerchants = () => {
    getMerchants()
      .then((merchants) => {
        setMerchants(merchants);
      })
      .catch((error) => {
        console.error("Failed to fetch merchants:", error);
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
      const merchantsData = await getMerchant(formData.get("merchant"));
      const getMerchantAxios = merchantsData;

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

      const result = await addMerchantTransaction(e.target);

      if (formData.get("transaction_type") === "lend") {
        getBoxAxios.borrowed_merchant += parseInt(formData.get("box_qtt"));
        getBoxAxios.box_qtt -= parseInt(formData.get("box_qtt"));
      } else if (formData.get("transaction_type") === "devolution") {
        getBoxAxios.borrowed_merchant -= parseInt(formData.get("box_qtt"));
        getBoxAxios.box_qtt += parseInt(formData.get("box_qtt"));
      }

      await addNewBox(formData.get("box_type"), getBoxAxios);

      if (
        formData.get("transaction_type") === "lend" &&
        formData.get("box_type") === "premium"
      ) {
        getMerchantAxios.box_premium += parseInt(formData.get("box_qtt"));
      } else if (
        formData.get("transaction_type") === "devolution" &&
        formData.get("box_type") === "premium"
      ) {
        getMerchantAxios.box_premium -= parseInt(formData.get("box_qtt"));
      }

      if (
        formData.get("transaction_type") === "lend" &&
        formData.get("box_type") === "common"
      ) {
        getMerchantAxios.box_common += parseInt(formData.get("box_qtt"));
      } else if (
        formData.get("transaction_type") === "devolution" &&
        formData.get("box_type") === "common"
      ) {
        getMerchantAxios.box_common -= parseInt(formData.get("box_qtt"));
      }

      await updateMerchant(formData.get("merchant"), getMerchantAxios);

      props.setIsUpdated(true);
      props.onHide();
    } catch (error) {
      setErrorMessage("Failed to add merchant transaction:", error);
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
            <h2 className="modal-title">New merchant transaction</h2>
          </Modal.Title>
        </Modal.Header>

        <Form className="form-css" onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="row-css">
              <Col>
                <FormGroup controlId="merchant">
                  <FormLabel>Merchant</FormLabel>
                  <Form.Select name="merchant" required defaultValue="">
                    <option value="" disabled>
                      Choose a merchant
                    </option>
                    {merchants.map((merchant) => (
                      <option
                        key={merchant.merchantId}
                        value={merchant.merchantId}
                      >
                        {`${merchant.first_name} ${merchant.last_name}`}
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
                  />
                </Form.Group>
                {showLendErrorMessage && (
                  <p className="error-message">
                    more box than there is in the storehouse
                  </p>
                )}
                {showDevErrorMessage && (
                  <p className="error-message">
                    more box than there is with merchants
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

export default AddMerchantTransactionModal;
