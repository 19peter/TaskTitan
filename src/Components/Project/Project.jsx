import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Guest from "./guest"; // Import the Guest component
import Home from "../Home/home";
import Dashboard from "../Dashboard/dashboard";
import CalendarComp from "../Calendar/CalendarComp";
import { useNavigate, useParams } from "react-router-dom";
import Boardpage from "../../pages/Boardpage";
import Backlog from "../Backlog/Backlog";
import Members from "../Members/members";
import BacklogCalender from "../../pages/BacklogCalender";
import InviteMember from "../inviteMember/inviteMember";
import ProjectDashboard from "../Dashboard/project_dashboard";
import BoardIcon from '@mui/icons-material/Dashboard';
import DashboardIcon from '@mui/icons-material/Leaderboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useSelector } from "react-redux";

const drawerWidth = 240;

export default function Project({ data }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Inbox");
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, []);
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (text) => {
    setSelectedItem(text);
    setMobileOpen(false); // Close drawer when an item is clicked
  };

  const drawer = (
    <div style={{ color: "white" }}>
      {/* <Toolbar />
      <Divider /> */}
      {/* <List>
        {data.map((text, index) => (
          <ListItem
            key={text}
            button
            onClick={() => handleItemClick(text)}
            selected={selectedItem === text}
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon style={{ color: '#66fcf1' }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}


      <List>
        <ListItem
          // key={'board'}
          onClick={() => handleItemClick('Board')}
          selected={selectedItem === 'Board'}
        >
          <ListItemButton>
            <ListItemIcon>
              <BoardIcon style={{ color: '#66fcf1' }} />
            </ListItemIcon>
            <ListItemText primary={'Board'} />
          </ListItemButton>
        </ListItem>

        <ListItem
          // key={'board'}
          onClick={() => handleItemClick('Collaborators')}
          selected={selectedItem === 'Collaborators'}
        >
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon style={{ color: '#66fcf1' }} />
            </ListItemIcon>
            <ListItemText primary={'Collaborators'} />
          </ListItemButton>
        </ListItem>

        <ListItem
          // key={'board'}
          onClick={() => handleItemClick('Dashboard')}
          selected={selectedItem === 'Dashboard'}
        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: '#66fcf1' }} />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItemButton>
        </ListItem>


        <ListItem
          // key={'board'}
          onClick={() => handleItemClick('Calender')}
          selected={selectedItem === 'Calender'}
        >
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonthIcon style={{ color: '#66fcf1' }} />
            </ListItemIcon>
            <ListItemText primary={'Calender'} />
          </ListItemButton>
        </ListItem>



        <ListItem
          // key={'board'}
          onClick={() => handleItemClick('Backlog')}
          selected={selectedItem === 'Backlog'}
        >
          <ListItemButton>
            <ListItemIcon>
              <FormatListNumberedIcon style={{ color: '#66fcf1' }} />
            </ListItemIcon>
            <ListItemText primary={'Backlog'} />
          </ListItemButton>
        </ListItem>


        <ListItem
          // key={'board'}
          onClick={() => handleItemClick('InviteMember')}
          selected={selectedItem === 'InviteMember'}
        >
          <ListItemButton>
            <ListItemIcon>
              <ForwardToInboxIcon style={{ color: '#66fcf1' }} />
            </ListItemIcon>
            <ListItemText primary={'InviteMember'} />
          </ListItemButton>
        </ListItem>

      </List>
    </div>
  );

  const renderComponent = () => {
    switch (selectedItem) {
      case "Projects":
        return <Home />;
      case "Dashboard":
        return <ProjectDashboard />;
      case "Calender":
        return <CalendarComp id={id} />;
      case "Collaborators":
        return <Members id={id} />;
      case "Board":
        return <Boardpage id={id} />;
      case "Backlog":
        return <Backlog id={id} />;
      case "BacklogCalender":
        return <BacklogCalender />;
      case "InviteMember":
        return <InviteMember id={id}></InviteMember>;
      // case 'Members':
      //     return <ResponsiveDrawer data={['Collaborators', 'Invite Members']}></ResponsiveDrawer>
      //   case 'Team Leaders':
      //     return <Leader/>
      default:
        return <Boardpage id={id}></Boardpage>;
    }
  };

  return (
    <div style={{ display: 'flex', height: "100%" }}>

      <div style={{
        width: "fit-content",
        padding: "1vw",
        height: "100vh",
        backgroundColor: '#0b0c10',
        // border: "1px solid black",
        boxShadow: "3px 0 3px -2px black"
      }}>
        {drawer}
      </div>

      <div
        className="project"
        style={{
          // maxHeight: "90vh",
          minHeight: "fit-content",
          height: "100vh",
          width: "100%",
          // margin: "2vw",
          overflowY: "auto",
          border: "1px solid transparent",
          // borderRadius: "20px",
          backgroundColor: "#15171f",
          padding: '1vw',
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
}
