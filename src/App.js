import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import ProducerManager from "./components/Producer/ProducerManager";
import ProducerTransactionManager from "./components/ProducerTransaction/ProducerTransactionManager";
import MerchantManager from "./components/Merchant/MerchantManager";
import MerchantTransactionManager from "./components/MerchantTransaction/MerchantTransactionManager";
import BoxManager from "./components/Box/BoxManager";
import Sidebar from "./components/Sidebar";


function App() {
  return (
  <BrowserRouter>
        <Navigation />
        <Sidebar />
        <Routes>
          <Route exact="true" path="/" element={<Home/>} />
          <Route exact="true" path="/producers" element={<ProducerManager/>} />
          <Route exact="true" path="/merchants" element={<MerchantManager/>} />
          <Route exact="true" path="/producers-transactions" element={<ProducerTransactionManager/>} />
          <Route exact="true" path="/merchants-transactions" element={<MerchantTransactionManager/>} />
          <Route exact="true" path="/boxes" element={<BoxManager/>} />
        </Routes>
  </BrowserRouter>
  );
}

export default App;
