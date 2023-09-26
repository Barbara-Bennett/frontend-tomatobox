import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { getBoxes } from '../../services/BoxService';
import DamageBoxModal from './DamageBoxModal'; 
import AddNewBoxModal from './AddNewBoxModal';
import '../../App.css';


function BoxManager() {
  const [boxes, setBoxes] = useState([]);
  const [damageBoxModalShow, setDamageBoxModalShow] = useState(false); 
  const [damageBox, setDamageBox] = useState([]); 
  const [isUpdated, setIsUpdated] = useState(false);
  const [isAddNewBoxModalShow, setIsAddNewBoxModalShow] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (boxes.length && !isUpdated) {
      return;
    }
    getBoxes()
      .then(data => {
        if (mounted) {
          setBoxes(data);
        }
      });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, boxes]);

  const handleDamageBox = (e, bx) => { 
    e.preventDefault();
    setDamageBoxModalShow(true);
    setDamageBox(bx); 
  };

  const handleAddNewBox = (e, bx) => {
    e.preventDefault();
    setIsAddNewBoxModalShow(true);
    setDamageBox(bx); 
  };

  let DamageBoxModelClose = () => setDamageBoxModalShow(false); 
  let AddNewBoxModelClose = () => setIsAddNewBoxModalShow(false);

  return (
    <div className="side-container manage-tab content">
      <div className="row side-row">
        <h1 className="title">BOXES</h1>

        <Table bsPrefix="table custom-table" size='sm' borderless hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>Box Type</th>
              <th>Total</th>
              <th>Storehouse</th>
              <th>Producer</th>
              <th>Merchant</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {boxes.length > 0 ? (
              boxes.map((bx) => (
                <tr key={bx.box_type}>
                  <td>{bx.box_type}</td>
                  <td>{bx.qtt_total}</td>
                  <td>{bx.box_qtt}</td>
                  <td>{bx.borrowed_producer}</td>
                  <td>{bx.borrowed_merchant}</td>
                  <td>
                    <Button className="mr-2" onClick={event => handleAddNewBox(event, bx)}>
                      <FaPlus />
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button className="mr-2" variant="danger" onClick={event => handleDamageBox(event, bx)}> {/* Renomeie a função */}
                      <FaMinus />
                    </Button>
                    
                    <AddNewBoxModal show={isAddNewBoxModalShow} box={damageBox} setIsUpdated={setIsUpdated} onHide={AddNewBoxModelClose}></AddNewBoxModal>
                    <DamageBoxModal show={damageBoxModalShow} box={damageBox} setIsUpdated={setIsUpdated} onHide={DamageBoxModelClose}></DamageBoxModal> {/* Renomeie o componente */}

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No boxes found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default BoxManager;
