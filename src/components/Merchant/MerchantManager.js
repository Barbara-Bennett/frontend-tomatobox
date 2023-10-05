import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { getMerchants, deleteMerchant } from "../../services/MerchantService";
import {
  handleSearchOnChange,
  handleShowAll,
  SearchBar,
} from "../../helpers/searchHelpers";
import UpdateMerchantModal from "./UpdateMerchantModal";
import { handleDelete, DeleteButton } from "../../helpers/buttonHelpers";

import "../../App.css";

function MerchantManager() {
  const [originalMerchants, setOriginalMerchants] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editMerchant, setEditMerchant] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (merchants.length && !isUpdated) {
      return;
    }
    getMerchants().then((data) => {
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

  const handleSearch = (e) => {
    handleSearchOnChange(
      e.target.value,
      originalMerchants,
      setSearchQuery,
      setMerchants,
      setShowAll,
      (item) => item
    );
  };

  const handleShowAllMerchants = (e) => {
    e.preventDefault();
    handleShowAll(originalMerchants, setMerchants, setSearchQuery, setShowAll);
  };

  const handleDeleteMerchant = (e, merchantId) => {
    handleDelete(merchantId, deleteMerchant, setIsUpdated);
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="side-container manage-tab content">
      <div className="row side-row">
        <h1 className="title">MERCHANTS</h1>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showAll={showAll}
          handleShowAll={handleShowAllMerchants}
          modalType="addMerchant"
          handleAdd={handleAdd}
          addModalShow={addModalShow}
          setIsUpdated={setIsUpdated}
          AddModelClose={AddModelClose}
          handleSearch={handleSearch}
          placeholderText="Search Merchant"
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
            {merchants.length > 0 ? (
              merchants.map((merchant) => (
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
                    <DeleteButton
                      onClick={(event) =>
                        handleDeleteMerchant(event, merchant.merchantId)
                      }
                    />

                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button
                      className="mr-2"
                      onClick={(event) => handleUpdate(event, merchant)}
                    >
                      <FaEdit />
                    </Button>
                    <UpdateMerchantModal
                      show={editModalShow}
                      merchant={editMerchant}
                      setIsUpdated={setIsUpdated}
                      onHide={EditModelClose}
                    ></UpdateMerchantModal>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No merchants found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MerchantManager;
