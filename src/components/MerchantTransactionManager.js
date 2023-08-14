import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getMerchantsTransactions, deleteMerchantTransaction } from '../services/MerchantTransactionService';
import AddMerchantTransactionModal from "./AddMerchantTransactionModal";
import UpdateMerchantTransactionModal from "./UpdateMerchantTransactionModal";
import "../App.css";

import { format } from 'date-fns';

function MerchantTransactionManager() {
  const [originalMerchantsTransactions, setOriginalMerchantsTransactions] = useState([]);
  const [merchantsTransactions, setMerchantsTransactions] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editMerchantTransaction, setEditMerchantTransaction] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (merchantsTransactions.length && !isUpdated) {
      return;
    }

    getMerchantsTransactions()
      .then(data => {
        if (mounted) {
          setOriginalMerchantsTransactions(data);
          setMerchantsTransactions(data);
        }
      })
      .catch(error => {
        console.error('Error fetching merchant transactions:', error);
      });

    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, merchantsTransactions]);

  const handleUpdate = (e, merTra) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditMerchantTransaction(merTra);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleSearchOnChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setMerchantsTransactions(originalMerchantsTransactions);
      setShowAll(true);
    } else {
      const searchKeywords = value.toLowerCase().split(" ");
      const filteredMerchantsTransactions = originalMerchantsTransactions.filter((merTra) => {
        const fullName = `${merTra.merchant_name}`.toLowerCase();
        return searchKeywords.some(keyword => fullName.includes(keyword));
      });
      setMerchantsTransactions(filteredMerchantsTransactions);
      setShowAll(false);
    }
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    setMerchantsTransactions(originalMerchantsTransactions);
    setSearchQuery("");
    setShowAll(true);
  };

  const handleDelete = (e, merchantTransactionId) => {
    if (window.confirm('Are you sure ?')) {
      e.preventDefault();
      deleteMerchantTransaction(merchantTransactionId)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        },
        (error) => {
          alert("Failed to Delete MerchantTransaction");
        });
    }
  };
  
  const formatDate = (dateString) => {
    const dateObject = new Date(Date.parse(dateString));

    if (isNaN(dateObject)) {
      const dateParts = dateString.split('-');
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
        }
      }
      return dateString;
    }

    const formattedDate = format(dateObject, 'MM/dd/yyyy');
    return formattedDate;
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="side-container manage-tab content">
      <div className="row side-row">

        <h1 className="title">MERCHANTS TRANSACTIONS</h1>
        <InputGroup className='input-group'>
          <Form.Control
            className='input-search'
            placeholder="Search MerchantTransaction"
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
            <AddMerchantTransactionModal show={addModalShow} setIsUpdated={setIsUpdated}
              onHide={AddModelClose}></AddMerchantTransactionModal>
          </ButtonToolbar>
        </InputGroup>

        <Table bsPrefix="table custom-table" size='sm' borderless hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Transaction</th>
              <th>Box type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {merchantsTransactions.length > 0
              ? merchantsTransactions.map((merTra) => (
                <tr key={merTra.merchantTransactionId}>
                  <td>{merTra.merchantTransactionId}</td>
                  <td>{merTra.merchant_name}</td>
                  <td>{formatDate(merTra.date)}</td> 
                  <td>{merTra.transaction_type}</td>
                  <td>{merTra.box_type}</td>
                  <td>{merTra.box_qtt}</td>
                  <td>${merTra.price}</td>
                  <td style={{ display: 'none' }}>{merTra.merchant}</td>
                  <td>

                    <Button className="mr-2" variant="danger"
                      onClick={event => handleDelete(event, merTra.merchantTransactionId)}>
                      <RiDeleteBin5Line />
                    </Button>

                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button className="mr-2"
                      onClick={event => handleUpdate(event, merTra)}>
                      <FaEdit />
                    </Button>
                    <UpdateMerchantTransactionModal show={editModalShow} merchantTransaction={editMerchantTransaction} setIsUpdated={setIsUpdated}
                      onHide={EditModelClose}></UpdateMerchantTransactionModal>
                  </td>
                </tr>
              ))
              : <tr><td colSpan="8">No Merchants Transactions found.</td></tr>
            }
          </tbody>
        </Table>
        
      </div>
    </div>
  );
}

export default MerchantTransactionManager;
