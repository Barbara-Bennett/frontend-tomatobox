import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import inventoryLogo from "../static/inventoryLogo.jpg";
import merchantLogo from "../static/merchantLogo.jpg"
import producerLogo from "../static/producerLogo.jpg"
import { getBoxes} from '../services/BoxService';
import BoxManager from './Box/BoxManager';
import "../App.css";

const Home = ( ) => {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (boxes.length) {
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
    };
  }, [boxes]);

  return (
    <div className="cards-container">
    <div className="d-flex justify-content-around">
      <Card className='cards-style'>
        <Card.Img variant="top" src={producerLogo} />
        <Card.Body className='cards'>
          <Card.Title><h4 className='cards-title'> Producers </h4></Card.Title>
          <Card.Text className='cards'>
            <span className='span-css'>Total of premium boxes</span> <br />
            {boxes.map(bx => bx.box_type === 'premium' ? <p key={bx.box_type}>{bx.borrowed_producer}</p> : null)} 
            <span className='span-css'>Total of common boxes</span> <br />
            {boxes.map(bx => bx.box_type === 'common' ? <p key={bx.box_type}>{bx.borrowed_producer}</p> : null)} 
          </Card.Text>
        </Card.Body>
      </Card>


      <Card className='cards-style'>
        <Card.Img variant="top" src={merchantLogo} />
        <Card.Body className='cards'>
          <Card.Title><h4 className='cards-title'> Merchants </h4></Card.Title>
          <Card.Text className='cards'>
            <span className='span-css'>Total of premium boxes</span> <br />
            {boxes.map(bx => bx.box_type === 'premium' ? <p key={bx.box_type}>{bx.borrowed_merchant}</p> : null)}
            <span className='span-css'>Total of common boxes</span> <br />
            {boxes.map(bx => bx.box_type === 'common' ? <p key={bx.box_type}>{bx.borrowed_merchant}</p> : null)}
          </Card.Text>
        </Card.Body>
      </Card>


      <Card className='cards-style'>
        <Card.Img variant="top" src={inventoryLogo} />
        <Card.Body className='cards'>
          <Card.Title> <h4 className='cards-title'> Storehouse </h4></Card.Title>
          <Card.Text className='cards'>
          <span className='span-css'>Total of premium boxes</span> <br />
          {boxes.map(bx => bx.box_type === 'premium' ? <p key={bx.box_type}>{bx.box_qtt}</p> : null)} 
          <span className='span-css'>Total of common boxes</span> <br />
          {boxes.map(bx => bx.box_type === 'common' ? <p key={bx.box_type}>{bx.box_qtt}</p> : null)} 
          </Card.Text>
        </Card.Body>
      </Card>
    </div>

    </div>
  );
}

export default Home;