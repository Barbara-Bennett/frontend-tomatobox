import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  getMerchantsTransactions,
  deleteMerchantTransaction,
} from "../../services/MerchantTransactionService";
import UpdateMerchantTransactionModal from "./UpdateMerchantTransactionModal";
import "../../App.css";
import {
  handleSearchOnChange,
  handleShowAll,
  SearchBar,
} from "../../helpers/searchHelpers";
import { handleDelete, DeleteButton } from "../../helpers/buttonHelpers";
import { format } from "date-fns";

function MerchantTransactionManager() {
  const [originalMerchantsTransactions, setOriginalMerchantsTransactions] =
    useState([]);
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
      .then((data) => {
        if (mounted) {
          setOriginalMerchantsTransactions(data);
          setMerchantsTransactions(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching merchant transactions:", error);
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

  const handleSearch = (e) => {
    handleSearchOnChange(
      e.target.value,
      originalMerchantsTransactions,
      setSearchQuery,
      setMerchantsTransactions,
      setShowAll,
      (item) => item
    );
  };

  const handleShowAllMerchantsTransaction = (e) => {
    e.preventDefault();
    handleShowAll(
      originalMerchantsTransactions,
      setMerchantsTransactions,
      setSearchQuery,
      setShowAll
    );
  };

  const handleDeleteMerchantTransaction = (e, merchantTransactionId) => {
    handleDelete(
      merchantTransactionId,
      deleteMerchantTransaction,
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
        <h1 className="title">MERCHANTS TRANSACTIONS</h1>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showAll={showAll}
          handleShowAll={handleShowAllMerchantsTransaction}
          modalType="addMerchantTransaction"
          handleAdd={handleAdd}
          addModalShow={addModalShow}
          setIsUpdated={setIsUpdated}
          AddModelClose={AddModelClose}
          handleSearch={handleSearch}
          placeholderText="Search Merchant Transaction"
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
            {merchantsTransactions.length > 0 ? (
              merchantsTransactions.map((merTra) => (
                <tr key={merTra.merchantTransactionId}>
                  <td>{merTra.merchantTransactionId}</td>
                  <td>{merTra.merchant_name}</td>
                  <td>{formatDate(merTra.date)}</td>
                  <td>{merTra.transaction_type}</td>
                  <td>{merTra.box_type}</td>
                  <td>{merTra.box_qtt}</td>
                  <td>${merTra.price}</td>
                  <td style={{ display: "none" }}>{merTra.merchant}</td>
                  <td>
                    <DeleteButton
                      onClick={(event) =>
                        handleDeleteMerchantTransaction(
                          event,
                          merTra.merchantTransactionId
                        )
                      }
                    />

                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button
                      className="mr-2"
                      onClick={(event) => handleUpdate(event, merTra)}
                    >
                      <FaEdit />
                    </Button>
                    <UpdateMerchantTransactionModal
                      show={editModalShow}
                      merchantTransaction={editMerchantTransaction}
                      setIsUpdated={setIsUpdated}
                      onHide={EditModelClose}
                    ></UpdateMerchantTransactionModal>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Merchants Transactions found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MerchantTransactionManager;
