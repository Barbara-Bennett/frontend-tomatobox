import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import {
  getProducersTransactions,
  deleteProducerTransaction,
} from "../../services/ProducerTransactionService";
import UpdateProducerTransactionModal from "./UpdateProducerTransactionModal";
import {
  handleSearchOnChange,
  handleShowAll,
  SearchBar,
} from "../../helpers/searchHelpers";
import { handleDelete, DeleteButton } from "../../helpers/buttonHelpers";
import "../../App.css";
import { format } from "date-fns";

function ProducerTransactionManager() {
  const [originalProducersTransactions, setOriginalProducersTransactions] =
    useState([]);
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
      .then((data) => {
        if (mounted) {
          setOriginalProducersTransactions(data);
          setProducersTransactions(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching producer transactions:", error);
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

  const handleSearch = (e) => {
    handleSearchOnChange(
      e.target.value,
      originalProducersTransactions,
      setSearchQuery,
      setProducersTransactions,
      setShowAll,
      (item) => item
    );
  };

  const handleShowAllProducersTransactions = (e) => {
    e.preventDefault();
    handleShowAll(
      originalProducersTransactions,
      setProducersTransactions,
      setSearchQuery,
      setShowAll
    );
  };

  const handleDeleteProducerTransaction = (e, producerTransactionId) => {
    handleDelete(
      producerTransactionId,
      deleteProducerTransaction,
      setIsUpdated
    );
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(Date.parse(dateString));

    if (isNaN(dateObject)) {
      const dateParts = dateString.split("-");
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return `${String(month).padStart(2, "0")}/${String(day).padStart(
            2,
            "0"
          )}/${year}`;
        }
      }
      return dateString;
    }

    const formattedDate = format(dateObject, "MM/dd/yyyy");
    return formattedDate;
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="side-container manage-tab content">
      <div className="row side-row">
        <h1 className="title">PRODUCERS TRANSACTIONS</h1>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showAll={showAll}
          handleShowAll={handleShowAllProducersTransactions}
          modalType="addProducerTransaction"
          handleAdd={handleAdd}
          addModalShow={addModalShow}
          setIsUpdated={setIsUpdated}
          AddModelClose={AddModelClose}
          handleSearch={handleSearch}
          placeholderText="Search Producers Transaction"
        />

        <Table
          bsPrefix="table custom-table"
          size="sm"
          borderless
          hover
          className="react-bootstrap-table"
          id="dataTable"
        >
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
            {producersTransactions.length > 0 ? (
              producersTransactions.map((proTra) => (
                <tr key={proTra.producerTransactionId}>
                  <td>{proTra.producerTransactionId}</td>
                  <td>{proTra.producer_name}</td>
                  <td>{formatDate(proTra.date)}</td>
                  <td>{proTra.transaction_type}</td>
                  <td>{proTra.box_type}</td>
                  <td>{proTra.box_qtt}</td>
                  <td>${proTra.price}</td>
                  <td style={{ display: "none" }}>{proTra.producer}</td>
                  <td>
                    <DeleteButton
                      onClick={(event) =>
                        handleDeleteProducerTransaction(
                          event,
                          proTra.producerTransactionId
                        )
                      }
                    />

                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button
                      className="mr-2"
                      onClick={(event) => handleUpdate(event, proTra)}
                    >
                      <FaEdit />
                    </Button>
                    <UpdateProducerTransactionModal
                      show={editModalShow}
                      producerTransaction={editProducerTransaction}
                      setIsUpdated={setIsUpdated}
                      onHide={EditModelClose}
                    ></UpdateProducerTransactionModal>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Producers Transactions found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProducerTransactionManager;
