import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getProducers, deleteProducer } from '../services/ProducerService';
import { getProducersTransactions } from '../services/ProducerTransactionService';
import {ProducerTransactionManager} from './ProducerTransactionManager'
import AddProducerModal from "./AddProducerModal";
import UpdateProducerModal from "./UpdateProducerModal";
import "../App.css";

function ProducerManager() {
  const [originalProducers, setOriginalProducers] = useState([]);
  const [producers, setProducers] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editProducer, setEditProducer] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(true);
  console.log(producers)

  useEffect(() => {
    let mounted = true;
    if (producers.length && !isUpdated) {
      return;
    }
    getProducers()
      .then(data => {
        if (mounted) {
          setOriginalProducers(data);
          setProducers(data);
        }
      });

    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, producers]);

  const handleUpdate = (e, pro) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditProducer(pro);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleSearchOnChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setProducers(originalProducers);
      setShowAll(true);
    } else {
      const searchKeywords = value.toLowerCase().split(" ");
      const filteredProducers = originalProducers.filter((pro) => {
        const fullName = `${pro.first_name} ${pro.last_name}`.toLowerCase();
        return searchKeywords.some(keyword => fullName.includes(keyword));
      });
      setProducers(filteredProducers);
      setShowAll(false);
    }
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    setProducers(originalProducers);
    setSearchQuery("");
    setShowAll(true);
  };

  const handleDelete = (e, producerId) => {
    if (window.confirm('Are you sure ?')) {
      e.preventDefault();
      deleteProducer(producerId)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        },
        (error) => {
          alert("Failed to Delete Producer");
        });
    }
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="side-container manage-tab content">
      <div className="row side-row">
        <h1 className="title">PRODUCERS</h1>
        <InputGroup className='input-group'>
          <Form.Control
            className='input-search'
            placeholder="Search Producer"
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
            <AddProducerModal show={addModalShow} setIsUpdated={setIsUpdated}
              onHide={AddModelClose}></AddProducerModal>
          </ButtonToolbar>
        </InputGroup>

        <Table bsPrefix="table custom-table" size='sm' borderless hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Adress</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment</th>
              <th>Premium</th>
              <th>Common</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {producers.length > 0
              ? producers.map((pro) => (
                <tr key={pro.producerId}>
                  <td>{pro.producerId}</td>
                  <td className="custom-td">{pro.first_name}</td>
                  <td>{pro.last_name}</td>
                  <td>{pro.address}</td>
                  <td>{pro.email}</td>
                  <td>{pro.phone_number}</td>
                  <td>{pro.payment_method}</td>
                  <td>{pro.box_premium}</td>
                  <td>{pro.box_common}</td>
                  <td>
                    <Button className="mr-2" variant="danger"
                      onClick={event => handleDelete(event, pro.producerId)}>
                      <RiDeleteBin5Line />
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button className="mr-2"
                      onClick={event => handleUpdate(event, pro)}>
                      <FaEdit />
                    </Button>
                    <UpdateProducerModal show={editModalShow} producer={editProducer} setIsUpdated={setIsUpdated}
                      onHide={EditModelClose}></UpdateProducerModal>
                  </td>
                </tr>
              ))
              : <tr><td colSpan="8">No producers found.</td></tr>
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProducerManager;