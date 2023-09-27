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


const Sidebar = () => {
  const menuItems = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/producers', icon: 'user', label: 'Producers' },
    { to: '/merchants', icon: 'user', label: 'Merchants' },
    { to: '/producers-transactions', icon: 'list', iconType: 'solid', label: 'Producers Transactions' },
    { to: '/merchants-transactions', icon: 'list', iconType: 'solid', label: 'Merchants Transactions' },
    { to: '/boxes', icon: 'box', iconType: 'solid', label: 'Box Inventory' },
  ];

  return (
    <div className='sidebar'>
      <CDBSidebar textColor="#333" backgroundColor="#f2f8ea">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}> Menu</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            {menuItems.map((item, index) => (
              <NavLink key={index} to={item.to} activeclassname="activeClicked">
                <CDBSidebarMenuItem icon={item.icon} iconType={item.iconType}>
                  {item.label}
                </CDBSidebarMenuItem>
              </NavLink>
            ))}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
