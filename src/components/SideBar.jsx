import React, { useState } from "react";
import {
  SideBarContainer,
  SideBarContent,
  SideBarHeader,
  SideBarTitle,
  SideBarFooter,
} from "../styles/SideBar.styles";
import {
  FaBars,
  FaFileInvoice,
  FaHome,
  FaOutdent,
  FaProductHunt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const SIDEBAR = [
    {
      id: 1,
      iconImg: FaProductHunt,
      title: "Home",
      path: "/product",
    },
    {
      id: 2,
      iconImg: FaHome,
      title: "page Name",
      path: "/profile",
    },
    {
      id: 3,
      iconImg: FaFileInvoice,
      title: "page Name",
      path: "/invoice",
    },
    {
      id: 4,
      iconImg: FaBars,
      title: "page Name",
      path: "/customer",
    },
    {
      id: 5,
      iconImg: FaHome,
      title: "page Name",
      path: "/privacy",
    },
    {
      id: 6,
      iconImg: FaFileInvoice,
      title: "page Name",
    },
  ];
  return (
    <SideBarContainer isOpen={isOpen}>
      <SideBarHeader onClick={() => setIsOpen(!isOpen)}>
        <SideBarContent isOpen={isOpen}>
          <FaFileInvoice style={{ width: "20px", height: "20px" }} />
          <SideBarTitle isOpen={isOpen}>Settigs</SideBarTitle>
        </SideBarContent>
      </SideBarHeader>

      {SIDEBAR.map((item) => {
        return (
          <Link to={item.path}>
            <SideBarContent isOpen={isOpen}>
              <item.iconImg
                style={{ background: "none", width: 20, height: 20 }}
              />
              <SideBarTitle isOpen={isOpen}>{item.title}</SideBarTitle>
            </SideBarContent>
          </Link>
        );
      })}
      <SideBarFooter>
        <SideBarContent isOpen={isOpen}>
          <FaFileInvoice
            style={{ background: "none", width: 20, height: 20 }}
          />
          <SideBarTitle isOpen={isOpen}>Settigs</SideBarTitle>
        </SideBarContent>
        <SideBarContent isOpen={isOpen}>
          <FaOutdent style={{ background: "none", width: 20, height: 20 }} />
          <SideBarTitle isOpen={isOpen}>LogOut</SideBarTitle>
        </SideBarContent>
      </SideBarFooter>
    </SideBarContainer>
  );
}
