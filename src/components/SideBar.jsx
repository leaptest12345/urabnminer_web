import React, { useState } from "react";
import {
  SideBarContainer,
  SideBarContent,
  SideBarHeader,
  SideBarTitle,
  SideBarFooter,
} from "../styles/SideBar.styles";
import { FaBars, FaFileInvoice, FaHome, FaOutdent } from "react-icons/fa";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const SIDEBAR = [
    {
      id: 1,
      iconImg: FaBars,
      title: "Home",
    },
    {
      id: 2,
      iconImg: FaHome,
      title: "page Name",
    },
    {
      id: 3,
      iconImg: FaFileInvoice,
      title: "page Name",
    },
    {
      id: 4,
      iconImg: FaBars,
      title: "page Name",
    },
    {
      id: 5,
      iconImg: FaHome,
      title: "page Name",
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
          <SideBarContent isOpen={isOpen}>
            <item.iconImg
              style={{ background: "none", width: 20, height: 20 }}
            />
            <SideBarTitle isOpen={isOpen}>{item.title}</SideBarTitle>
          </SideBarContent>
        );
      })}
      {/* <SideBarFooter isOpen={isOpen}>
        <FaFileInvoice style={{ background: "none", width: 20, height: 20 }} />
        <SideBarTitle isOpen={isOpen}>{item.title}</SideBarTitle>
      </SideBarFooter> */}
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
