import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

//Styles
import "./Sidebar.css";
import AddIcon from "../assets/add_icon.svg";
import DashboardIcon from "../assets/dashboard_icon.svg";

import React from "react";
import Avatar from "./Avatar";

export default function Sidebar() {

  const {user} = useAuthContext();

  return (
    
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
        <p >Welcome {user.displayName} </p>
      </div>
      <nav className="links">
        <ul>
          <li>
            <NavLink exact to="/">
              <img src={DashboardIcon} alt="Dashboard" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/create">
              <img src={AddIcon} alt="add project icon" />
              <span>New project</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
}
