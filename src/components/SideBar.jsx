import React, { useEffect, useState } from "react";
import {
  SideBarContainer,
  SideBarContent,
  SideBarHeader,
  SideBarTitle,
} from "../styles/SideBar.styles";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SIDEBAR } from "../utils/constants/commonConst";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { AuthContext } from "../utils/AuthContext";

export default function SideBar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [sideBardId, setSideBarId] = useState(1);
  const { signOut } = React.useContext(AuthContext);

  const location = useLocation();
  const path = location.pathname;

  const SideBarContentView = isOpen
    ? styled.div`
        height: 65%;
        overflow: visible;
        @media (max-width: 900px) {
          height: 100%;
          margin-top: 10px;
        }
      `
    : styled.div`
        height: 65%;
        overflow: visible;
        @media (max-width: 900px) {
          display: flex;
          height: 75%;
          width: 65%;
          justify-content: space-between;
        }
      `;
  const SideBarFooter = isOpen
    ? styled.div`
        border-top: 1px solid grey;
        overflow: visible;
        margin-top: 10px;
      `
    : styled.div`
        border-top: 1px solid grey;
        @media (max-width: 900px) {
          display: flex;
          border: 0;
          justify-content: space-between;
        }
      `;
  const signOutUser = () => {
    navigate("/");
    signOut();
  };

  useEffect(() => {}, []);
  const img = { background: "none", width: 20, height: 20 };

  return (
    <SideBarContainer isOpen={isOpen}>
      <SideBarHeader onClick={() => setIsOpen(!isOpen)}>
        <FaBars style={{ width: "20px", height: "20px" }} />
        <SideBarTitle isOpen={isOpen}>Settigs</SideBarTitle>
      </SideBarHeader>
      <SideBarContentView>
        {SIDEBAR.map((item) => {
          return (
            <Link to={item.path} onClick={() => setSideBarId(item.id)}>
              <SideBarContent
                isOpen={isOpen}
                background={path == item.path ? true : false}
              >
                <item.iconImg style={img} />
                <SideBarTitle isOpen={isOpen}>{item.title}</SideBarTitle>
              </SideBarContent>
            </Link>
          );
        })}
      </SideBarContentView>
      <SideBarFooter>
        <Link to="/settings" onClick={() => setSideBarId(-1)}>
          <SideBarContent
            isOpen={isOpen}
            background={path == "/settings" ? true : false}
          >
            <SettingsIcon style={img} />
            <SideBarTitle isOpen={isOpen}>Settigs</SideBarTitle>
          </SideBarContent>
        </Link>
        <SideBarContent isOpen={isOpen} onClick={() => signOutUser()}>
          <LogoutIcon style={img} />
          <SideBarTitle isOpen={isOpen}>LogOut</SideBarTitle>
        </SideBarContent>
      </SideBarFooter>
    </SideBarContainer>
  );
}
