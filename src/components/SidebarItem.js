import React from "react";
import '../css/Sidebar.css';

function SidebarItem({ menu, isActive }) {
  return isActive === true ? (
    <div className="sidebar-item active" >
      <div className='activated'>{menu.name}</div>
    </div>
  ) : (
    <div className="sidebar-item ">
      <div>{menu.name}</div>
    </div>
  );
}

export default SidebarItem;