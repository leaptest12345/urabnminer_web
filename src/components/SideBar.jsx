import React, { useEffect, useState } from "react";
import {
  SideBarContainer,
  SideBarContent,
  SideBarContentView1,
  SideBarContentView2,
  SideBarFooter1,
  SideBarFooter2,
  SideBarHeader,
  SideBarTitle,
} from "../styles/SideBar.styles";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR } from "../utils/constants/commonConst";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { AuthContext } from "../utils/AuthContext";
import { getData } from "../utils/firebase/firebaseApi";
import { RowView } from "../styles/Invoice.styles";

export default function SideBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sideBardId, setSideBarId] = useState(1);
  const { signOut } = React.useContext(AuthContext);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const path = location.pathname;

  const SideBarContentView = isOpen ? SideBarContentView1 : SideBarContentView2;
  const SideBarFooter = isOpen ? SideBarFooter1 : SideBarFooter2;
  const signOutUser = () => {
    navigate("/");
    signOut();
  };

  const getuserDetail = async () => {
    try {
      const id = localStorage.getItem("userID");
      const detail = await getData(`/USERS/${id}`);
      setUser(detail);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getuserDetail();
  }, []);
  const img = { background: "none", width: 20, height: 20 };

  return (
    <SideBarContainer isOpen={isOpen}>
      <SideBarHeader onClick={() => setIsOpen(!isOpen)}>
        <SideBarContent isOpen={isOpen} background={false}>
          <FaBars style={{ width: "20px", height: "20px" }} />
          <SideBarTitle isOpen={isOpen}>UrbanMiner</SideBarTitle>
        </SideBarContent>
      </SideBarHeader>
      {/* <RowView
        style={{
          width: "100%",
          borderBottom: "1px solid grey",
          justifyContent: "space-around",
        }}
      >
        <img
          src={user?.photo}
          style={{
            width: "50px",
            heigth: "100px",
            borderRadius: "100%",
          }}
        />
        <SideBarTitle isOpen={isOpen}>
          {user?.firstName + "".substring(0, 10)}
        </SideBarTitle>
      </RowView> */}

      <SideBarContentView>
        {SIDEBAR.map((item, index) => {
          return (
            <Link
              to={item.path}
              onClick={() => setSideBarId(item.id)}
              key={index + 1 + "-"}
            >
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
