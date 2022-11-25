import React, { useState } from "react";
import {
  SideBarContainer,
  SideBarContent,
  SideBarHeader,
  SideBarTitle,
} from "../styles/SideBar.styles";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SIDEBAR } from "../utils/constants/commonConst";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [sideBardId, setSideBarId] = useState(1);
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
  return (
    <SideBarContainer isOpen={isOpen}>
      <SideBarHeader onClick={() => setIsOpen(!isOpen)}>
        <FaBars style={{ width: "20px", height: "20px" }} />
        <SideBarTitle isOpen={isOpen}>Settigs</SideBarTitle>
      </SideBarHeader>
      <SideBarContentView>
        {SIDEBAR.map((item) => {
          return (
            <Link
              to={item.path}
              onClick={() => setIsOpen(false) + setSideBarId(item.id)}
            >
              <SideBarContent
                isOpen={isOpen}
                background={sideBardId == item.id ? true : false}
              >
                <item.iconImg
                  style={{ background: "none", width: 20, height: 20 }}
                />
                <SideBarTitle isOpen={isOpen}>{item.title}</SideBarTitle>
              </SideBarContent>
            </Link>
          );
        })}
      </SideBarContentView>
      <SideBarFooter>
        <SideBarContent isOpen={isOpen}>
          <SettingsIcon style={{ background: "none", width: 20, height: 20 }} />
          <SideBarTitle isOpen={isOpen}>Settigs</SideBarTitle>
        </SideBarContent>
        <SideBarContent isOpen={isOpen}>
          <LogoutIcon style={{ background: "none", width: 20, height: 20 }} />
          <SideBarTitle isOpen={isOpen}>LogOut</SideBarTitle>
        </SideBarContent>
      </SideBarFooter>
    </SideBarContainer>
  );
}
