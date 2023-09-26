import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { FormLabel, FormGroup } from 'react-bootstrap';
import { updateMerchantTransaction } from '../../services/MerchantTransactionService';
import { getMerchants } from '../../services/MerchantService';
import { getBox, addNewBox } from '../../services/BoxService';
import { getMerchant, updateMerchant } from '../../services/MerchantService';
import "../../App.css";

const UpdateMerchantTransactionModal = (props) => {
  const [initialBoxQtt, setInitialBoxQtt] = useState(0);
  const [showLendErrorMessage, setShowLendErrorMessage] = useState(false);
  const [showDevErrorMessage, setShowDevErrorMessage] = useState(false);
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    setInitialBoxQtt(parseInt(props.merchantTransaction.box_qtt));
  }, [props.merchantTransaction.box_qtt]);

  useEffect(() => {
    if (props.show) {
      setShowLendErrorMessage(false);
      setShowDevErrorMessage(false);
    }
  }, [props.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLendErrorMessage(false);
    setShowDevErrorMessage(false);

    const formData = new FormData(e.target);

    try {
      const boxData = await getBox(formData.get('box_type'));
      const getBoxAxios = boxData;
      const merchantsData = await getMerchant(formData.get('merchant'));
      const getMerchantAxios = merchantsData;

      updateMerchantTransaction(props.merchantTransaction.merchantTransactionId, e.target)
        .then(async (result) => {
          const initialValue = initialBoxQtt;
          const currentValue = parseInt(formData.get('box_qtt'));
          const transaction = formData.get('transaction_type');
          const diff = Math.abs(currentValue - initialValue);
          let total = getBoxAxios.qtt_total;
          let storehouse = getBoxAxios.box_qtt;
          const box_type = formData.get('box_type');

          getBox(formData.get('box_type')).then(async (boxData) => {
            const getBoxAxios = boxData;

            //  SEND TO BOXES
            if (transaction === 'lend') {
              if (initialValue < currentValue) {
                getBoxAxios.borrowed_merchant += diff;
                getBoxAxios.box_qtt -= diff;
              } else if (initialValue > currentValue) {
                getBoxAxios.borrowed_merchant -= diff;
                getBoxAxios.box_qtt += diff;
              }
            } else if (transaction === 'devolution') {
              if (initialValue < currentValue) {
                const tests = getBoxAxios.borrowed_merchant + initialValue;
                getBoxAxios.borrowed_merchant = tests - currentValue;
                getBoxAxios.box_qtt += diff;
              } else if (initialValue > currentValue) {
                getBoxAxios.borrowed_merchant += diff;
                getBoxAxios.box_qtt -= diff;
              }
            }

            if (transaction === 'lend' && currentValue > storehouse) {
              setShowLendErrorMessage(true);
              return;
            }
            if (transaction === 'devolution' && currentValue > (total - storehouse)) {
              setShowDevErrorMessage(true);
              return;
            }

            await addNewBox(formData.get('box_type'), getBoxAxios);

            // Send to Merchants
            if (transaction === 'lend' && box_type === 'premium') {
              if (initialValue < currentValue) {
                getMerchantAxios.box_premium += diff;
              } else if (initialValue > currentValue) {
                getMerchantAxios.box_premium -= diff;
              }
            }
            if (transaction === 'devolution' && box_type === 'premium') {
              if (initialValue < currentValue) {
                getMerchantAxios.box_premium -= diff;
              } else if (initialValue > currentValue) {
                getMerchantAxios.box_premium += diff;
              }
            }
            if (transaction === 'lend' && box_type === 'common') {
              if (initialValue < currentValue) {
                getMerchantAxios.box_common += diff;
              } else if (initialValue > currentValue) {
                getMerchantAxios.box_common -= diff;
              }
            }
            if (transaction === 'devolution' && box_type === 'common') {
              if (initialValue < currentValue) {
                getMerchantAxios.box_common += diff;
              } else if (initialValue > currentValue) {
                getMerchantAxios.box_common -= diff;
              }
            }
            await updateMerchant(formData.get('merchant'), getMerchantAxios);

            props.setIsUpdated(true);
            props.onHide();
          });
        });
    } catch (error) {
      console.error("Failed to update merchant transaction:", error);
    }
  };

  return (
    <div className="container">
      <Modal
        className="container"
        {...props}
        size="mg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="header-modal" closeButton>
          <Modal.Title className="header-modal" id="contained-modal-title-vcenter">
            <h2 className="modal-title">Edit merchant transaction</h2>
          </Modal.Title>
        </Modal.Header>

        <Form className='form-css' onSubmit={handleSubmit}>

          <Modal.Body>
            <input type="hidden" name="merchant" value={props.merchantTransaction.merchant} />
            <input type="hidden" name="transaction_type" value={props.merchantTransaction.transaction_type} />
            <input type="hidden" name="box_type" value={props.merchantTransaction.box_type} />

            <Row className='row-css'>
              <Col>
                <FormLabel>Merchant</FormLabel>
                <br />
                <p className='p-css p-name'>{props.merchantTransaction.merchant_name}</p>
              </Col>
            </Row>

            <Row className='row-css'>
              <Col sm={6}>
                <Form.Group controlId="transaction_type">
                  <Form.Label>Transaction</Form.Label>
                  <br />
                  <p className='p-css'>{props.merchantTransaction.transaction_type} </p>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group controlId="box_type">
                  <Form.Label>Box type</Form.Label>
                  <br />
                  <p className='p-css'>{props.merchantTransaction.box_type} </p>
                </Form.Group>
              </Col>
            </Row>

            <Row className='row-css'>
              <Col sm={6}>
                <Form.Group controlId="box_qtt">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" name="box_qtt" defaultValue={props.merchantTransaction.box_qtt} required placeholder="" />
                </Form.Group>
                {showLendErrorMessage && <p className="error-message">Lending quantity exceeds available boxes.</p>}
                {showDevErrorMessage && <p className="error-message">Devolution quantity exceeds available boxes.</p>}
              </Col>

              <Col sm={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" defaultValue={props.merchantTransaction.price} required placeholder=""/>
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
      </Modal>
    </div>
  );
};

export default UpdateMerchantTransactionModal;
