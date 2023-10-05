import { React, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { getProducers, deleteProducer } from "../../services/ProducerService";
import {
  handleSearchOnChange,
  handleShowAll,
  SearchBar,
} from "../../helpers/searchHelpers";
import UpdateProducerModal from "./UpdateProducerModal";
import { handleDelete, DeleteButton } from "../../helpers/buttonHelpers";
import "../../App.css";

function ProducerManager() {
  const [originalProducers, setOriginalProducers] = useState([]);
  const [producers, setProducers] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editProducer, setEditProducer] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (producers.length && !isUpdated) {
      return;
    }
    getProducers().then((data) => {
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
    console.log("Botão New foi clicado!");
    setAddModalShow(true);
  };

  const handleSearch = (e) => {
    handleSearchOnChange(
      e.target.value,
      originalProducers,
      setSearchQuery,
      setProducers,
      setShowAll,
      (item) => item
    );
  };

  const handleShowAllProducers = (e) => {
    e.preventDefault();
    handleShowAll(originalProducers, setProducers, setSearchQuery, setShowAll);
  };

  const handleDeleteProducer = (e, producerId) => {
    handleDelete(producerId, deleteProducer, setIsUpdated);
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="side-container manage-tab content">
      <div className="row side-row">
        <h1 className="title">PRODUCERS</h1>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showAll={showAll}
          handleShowAll={handleShowAllProducers}
          modalType="addProducer"
          handleAdd={handleAdd}
          addModalShow={addModalShow}
          setIsUpdated={setIsUpdated}
          AddModelClose={AddModelClose}
          handleSearch={handleSearch}
          placeholderText="Search Producer"
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
            {producers.length > 0 ? (
              producers.map((pro) => (
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
                    <DeleteButton
                      onClick={(event) =>
                        handleDeleteProducer(event, producers.producerId)
                      }
                    />
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button
                      className="mr-2"
                      onClick={(event) => handleUpdate(event, pro)}
                    >
                      <FaEdit />
                    </Button>
                    <UpdateProducerModal
                      show={editModalShow}
                      producer={editProducer}
                      setIsUpdated={setIsUpdated}
                      onHide={EditModelClose}
                    ></UpdateProducerModal>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No producers found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProducerManager;
