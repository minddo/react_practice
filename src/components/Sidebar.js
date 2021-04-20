import React from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import '../css/Sidebar.css'

function Sidebar(props) {
  // URL의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;
  const menus = [
    { name: "회의실예약", path: "/main" },
    { name: "회의실예약현황", path: "/info" },
  ];

  return (
    <div className="backSide">
      <div className='userInfo'>
        <div>
          <p>{props.userInfo['USER_NAME']}</p>
          <p>{props.userInfo['DEPARTMENT_NAME']}|{props.userInfo['EMPLOYEE_ID']}</p>
        </div>
        <Link to=''>
        <button className='logoutBtn' style={{color:"black"}}>로그아웃</button>
        </Link>
      </div>
      <div className='sildBar'>
        <div className='topMenu'>예약</div>
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}  style={{color:"black"}}>
            <SidebarItem
              menu={menu}
              isActive={pathName === menu.path ? true : false}	// 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
            />
          </Link>
        );
      })}
      </div>
    </div>
  );
}

export default Sidebar;