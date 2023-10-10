import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getUpdateModalByType } from "./modalHelpers";

const ShowAllButton = ({ showAll, handleShowAll }) => {
  return (
    <Button
      variant="outline-secondary"
      onClick={handleShowAll}
      className="btn-show-all btn-form"
    >
      Show All
    </Button>
  );
};

const AddButton = ({ onClick }) => {
  return (
    <Button variant="success" onClick={onClick} className="btn-add btn-form">
      + NEW
    </Button>
  );
};

const handleDelete = (itemId, deleteFunction, setIsUpdated) => {
  if (window.confirm("Are you sure?")) {
    deleteFunction(itemId)
      .then((result) => {
        alert(result);
        setIsUpdated(true);
      })
      .catch((error) => {
        alert("Failed to Delete Item");
      });
  }
};

const DeleteButton = ({ onClick }) => {
  const handleClick = (event) => {
    onClick(event);
  };

  return (
    <Button className="mr-2" variant="danger" onClick={handleClick}>
      <RiDeleteBin5Line />
    </Button>
  );
};

const UpdateButton = ({
  onClick,
  modalType,
  editModalShow,
  setIsUpdated,
  EditModelClose,
}) => {
  const handleClick = (event) => {
    onClick(event);
  };

  const updateModal = getUpdateModalByType(modalType, {
    show: editModalShow,
    setIsUpdated,
    onHide: EditModelClose,
  });

  return (
    <div>
      <Button className="mr-2" onClick={handleClick}>
        <FaEdit />
      </Button>
      {updateModal}
    </div>
  );
};

export { ShowAllButton, AddButton, handleDelete, DeleteButton, UpdateButton };
