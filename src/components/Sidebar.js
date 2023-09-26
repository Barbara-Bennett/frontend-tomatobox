import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import "../App.css";


const Sidebar = ( ) => {
  return(
    <div className='sidebar'>
      <CDBSidebar textColor="#333" backgroundColor="#f2f8ea" >
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}> Menu</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            
            <NavLink exact="true" to="/" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="home" >Home</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/producers" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user"  >Producers</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/merchants" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user"  >Merchants</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/producers-transactions" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="list" iconType="solid">Producers Transactions</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/merchants-transactions" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="list" iconType="solid">Merchants Transactions</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/boxes"  activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="box" iconType="solid">Box Inventory</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>

  );
};

export default Sidebar;


