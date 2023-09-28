import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import merchantLogo from "../static/merchantLogo.jpg"
import inventoryLogo from "../static/inventoryLogo.jpg";
import producerLogo from "../static/producerLogo.jpg"
import { getBoxes } from '../services/BoxService';
import "../App.css";


const Home = () => {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (boxes.length) {
      return;
    }
    getBoxes().then((data) => {
      if (mounted) {
        setBoxes(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [boxes]);

  const renderCard = (title, imgSrc, keyType, borrowedProperty) => (
    <Card className="cards-style">
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body className="cards">
        <Card.Title>
          <h4 className="cards-title">{title}</h4>
        </Card.Title>
        <Card.Text className="cards">
          <span className="span-css">Total of premium boxes</span>
          <br />
          {boxes
            .filter((bx) => bx.box_type === 'premium')
            .map((bx) => <span key={bx[keyType]}>{bx[borrowedProperty]}</span>)}
          <br />
          <br />
          <span className="span-css">Total of common boxes</span>
          <br />
          {boxes
            .filter((bx) => bx.box_type === 'common')
            .map((bx) => <span key={bx[keyType]}>{bx[borrowedProperty]}</span>)}

        </Card.Text>
      </Card.Body>
    </Card>
  );
  
  return (
    <div className="cards-container">
      <div className="d-flex justify-content-around">
        {renderCard('Producers', producerLogo, 'box_type', 'borrowed_producer')}
        {renderCard('Merchants', merchantLogo, 'box_type', 'borrowed_merchant')}
        {renderCard('Storehouse', inventoryLogo, 'box_type', 'box_qtt')}
      </div>
    </div>
  );
}

export default Home;
