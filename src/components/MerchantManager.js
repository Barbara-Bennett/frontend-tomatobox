import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getMerchants, deleteMerchant } from '../services/MerchantService';
import { getMerchantTransactions } from '../services/MerchantTransactionService';
import { MerchantTransactionManager } from './MerchantTransactionManager';
import AddMerchantModal from "./AddMerchantModal";
import UpdateMerchantModal from "./UpdateMerchantModal";
import "../App.css";

function MerchantManager() {
  const [originalMerchants, setOriginalMerchants] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editMerchant, setEditMerchant] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(true);
  console.log(merchants);

  useEffect(() => {
    let mounted = true;
    if (merchants.length && !isUpdated) {
      return;
    }
    getMerchants()
      .then(data => {
        if (mounted) {
          setOriginalMerchants(data);
          setMerchants(data);
        }
      });

    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, merchants]);

  const handleUpdate = (e, merchant) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditMerchant(merchant);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleSearchOnChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setMerchants(originalMerchants);
      setShowAll(true);
    } else {
      const searchKeywords = value.toLowerCase().split(" ");
      const filteredMerchants = originalMerchants.filter((merchant) => {
        const fullName = `${merchant.first_name} ${merchant.last_name}`.toLowerCase();
        return searchKeywords.some(keyword => fullName.includes(keyword));
      });
      setMerchants(filteredMerchants);
      setShowAll(false);
    }
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    setMerchants(originalMerchants);
    setSearchQuery("");
    setShowAll(true);
  };

  const handleDelete = (e, merchantId) => {
    if (window.confirm('Are you sure ?')) {
      e.preventDefault();
      deleteMerchant(merchantId)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        },
        (error) => {
          alert("Failed to Delete Merchant");
        });
    }
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="side-container manage-tab content">
      <div className="row side-row">
        <h1 className="title">MERCHANTS</h1>
        <InputGroup className='input-group'>
          <Form.Control
            className='input-search'
            placeholder="Search Merchant"
            aria-label="Recipient's username with two button addons"
            value={searchQuery}
            onChange={handleSearchOnChange}
          />
          <ButtonToolbar>
            {!showAll && (
              <Button variant="outline-secondary" onClick={handleShowAll} className="btn-show-all btn-form">
                Show All
              </Button>
            )}
          </ButtonToolbar>
          <ButtonToolbar>
            <Button variant="success" onClick={handleAdd} className="btn-add btn-form">
              + NEW
            </Button>
            <AddMerchantModal show={addModalShow} setIsUpdated={setIsUpdated}
              onHide={AddModelClose}></AddMerchantModal>
          </ButtonToolbar>
        </InputGroup>

        <Table bsPrefix="table custom-table" size='sm' borderless hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment</th>
              <th>Premium</th>
              <th>Common</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {merchants.length > 0
              ? merchants.map((merchant) => (
                <tr key={merchant.merchantId}>
                  <td>{merchant.merchantId}</td>
                  <td className="custom-td">{merchant.first_name}</td>
                  <td>{merchant.last_name}</td>
                  <td>{merchant.address}</td>
                  <td>{merchant.email}</td>
                  <td>{merchant.phone_number}</td>
                  <td>{merchant.payment_method}</td>
                  <td>{merchant.box_premium}</td>
                  <td>{merchant.box_common}</td>
                  <td>
                    <Button className="mr-2" variant="danger"
                      onClick={event => handleDelete(event, merchant.merchantId)}>
                      <RiDeleteBin5Line />
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button className="mr-2"
                      onClick={event => handleUpdate(event, merchant)}>
                      <FaEdit />
                    </Button>
                    <UpdateMerchantModal show={editModalShow} merchant={editMerchant} setIsUpdated={setIsUpdated}
                      onHide={EditModelClose}></UpdateMerchantModal>
                  </td>
                </tr>
              ))
              : <tr><td colSpan="8">No merchants found.</td></tr>
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MerchantManager;
