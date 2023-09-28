import React from 'react';
import { Form, InputGroup, Button, ButtonToolbar } from 'react-bootstrap';
import AddProducerModal from "../components/Producer/AddProducerModal";


function handleSearchOnChange(value, originalData, setSearchQuery, setFilteredData, setShowAll, transformFunction) {
  const cleanedValue = value.trim().replace(/\s+/g, ' '); // 
  setSearchQuery(cleanedValue);

  if (cleanedValue === "") {
    setFilteredData(originalData);
    setShowAll(true);
  } else {
    const searchKeywords = cleanedValue.toLowerCase().split(" ");
    const filteredData = originalData.filter((item) => {
      const transformedItem = transformFunction(item);
      let fullName = "";

      if (transformedItem.first_name) {
        fullName = `${transformedItem.first_name} ${transformedItem.last_name}`.toLowerCase();
      } else if (transformedItem.merchant_name) {
        fullName = `${transformedItem.merchant_name}`.toLowerCase();
      }
      // change line 22 and fix space problem

      return searchKeywords.every(keyword => fullName.includes(keyword));
    });
    setFilteredData(filteredData);
    setShowAll(false);
  }
}


function handleShowAll(originalData, setOriginalData, setSearchQuery, 
  setShowAll) {
  setOriginalData(originalData);
  setSearchQuery("");
  setShowAll(true);
};

function SearchBar({
  searchQuery,
  setSearchQuery,
  showAll,
  handleShowAll,
  handleAdd,
  addModalShow,
  AddModelClose,
  setIsUpdated,
  handleSearch,
  placeholderText,
}) {
  return (
    <InputGroup className='input-group'>
      <Form.Control
        className='input-search mb-3'
        type="text"
        placeholder={placeholderText}
        aria-label="Recipient's username with two button addons"
        value={searchQuery}
        onChange={handleSearch}
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
        <AddProducerModal show={addModalShow} setIsUpdated={setIsUpdated} onHide={AddModelClose}></AddProducerModal>
      </ButtonToolbar>
    </InputGroup>
  );
}

export { handleSearchOnChange, handleShowAll, SearchBar };
