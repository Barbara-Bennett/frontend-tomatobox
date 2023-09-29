import React from "react";
import { Button } from "react-bootstrap";

function ShowAllButton({ showAll, handleShowAll }) {
  return (
    <Button
      variant="outline-secondary"
      onClick={handleShowAll}
      className="btn-show-all btn-form"
    >
      Show All
    </Button>
  );
}

function AddButton({ onClick }) {
  return (
    <Button variant="success" onClick={onClick} className="btn-add btn-form">
      + NEW
    </Button>
  );
}

export { ShowAllButton, AddButton };
