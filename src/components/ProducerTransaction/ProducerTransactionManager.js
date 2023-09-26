import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getProducersTransactions, deleteProducerTransaction } from '../../services/ProducerTransactionService';
import AddProducerTransactionModal from "./AddProducerTransactionModal";
import UpdateProducerTransactionModal from "./UpdateProducerTransactionModal";
import "../../App.css";

import { format } from 'date-fns';

function ProducerTransactionManager() {
  const [originalProducersTransactions, setOriginalProducersTransactions] = useState([]);
  const [producersTransactions, setProducersTransactions] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editProducerTransaction, setEditProducerTransaction] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (producersTransactions.length && !isUpdated) {
      return;
    }

    getProducersTransactions()
      .then(data => {
        if (mounted) {
          setOriginalProducersTransactions(data);
          setProducersTransactions(data);
        }
      })
      .catch(error => {
        console.error('Error fetching producer transactions:', error);
      });

    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, producersTransactions]);

  const handleUpdate = (e, proTra) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditProducerTransaction(proTra);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleSearchOnChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setProducersTransactions(originalProducersTransactions);
      setShowAll(true);
    } else {
      const searchKeywords = value.toLowerCase().split(" ");
      const filteredProducersTransactions = originalProducersTransactions.filter((proTra) => {
        const fullName = `${proTra.producer_name}`.toLowerCase();
        return searchKeywords.some(keyword => fullName.includes(keyword));
      });
      setProducersTransactions(filteredProducersTransactions);
      setShowAll(false);
    }
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    setProducersTransactions(originalProducersTransactions);
    setSearchQuery("");
    setShowAll(true);
  };

  const handleDelete = (e, producerTransactionId) => {
    if (window.confirm('Are you sure ?')) {
      e.preventDefault();
      deleteProducerTransaction(producerTransactionId)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        },
        (error) => {
          alert("Failed to Delete ProducerTransaction");
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

        <h1 className="title">PRODUCERS TRANSACTIONS</h1>
        <InputGroup className='input-group'>
          <Form.Control
            className='input-search'
            placeholder="Search ProducerTransaction"
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
            <AddProducerTransactionModal show={addModalShow} setIsUpdated={setIsUpdated}
              onHide={AddModelClose}></AddProducerTransactionModal>
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
            {producersTransactions.length > 0
              ? producersTransactions.map((proTra) => (
                <tr key={proTra.producerTransactionId}>
                  <td>{proTra.producerTransactionId}</td>
                  <td>{proTra.producer_name}</td>
                  <td>{formatDate(proTra.date)}</td> 
                  <td>{proTra.transaction_type}</td>
                  <td>{proTra.box_type}</td>
                  <td>{proTra.box_qtt}</td>
                  <td>${proTra.price}</td>
                  <td style={{ display: 'none' }}>{proTra.producer}</td>
                  <td>

                    <Button className="mr-2" variant="danger"
                      onClick={event => handleDelete(event, proTra.producerTransactionId)}>
                      <RiDeleteBin5Line />
                    </Button>

                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button className="mr-2"
                      onClick={event => handleUpdate(event, proTra)}>
                      <FaEdit />
                    </Button>
                    <UpdateProducerTransactionModal show={editModalShow} producerTransaction={editProducerTransaction} setIsUpdated={setIsUpdated}
                      onHide={EditModelClose}></UpdateProducerTransactionModal>
                  </td>
                </tr>
              ))
              : <tr><td colSpan="8">No Producers Transactions found.</td></tr>
            }
          </tbody>
        </Table>
        
      </div>
    </div>
  );
}

export default ProducerTransactionManager;