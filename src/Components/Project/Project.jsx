// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Guest from "./guest"; // Import the Guest component
// import Home from "../Home/home";
// import Dashboard from "../Dashboard/dashboard";
// import CalendarComp from "../Calendar/CalendarComp";
// import { useParams } from "react-router-dom";
// import Boardpage from "../../pages/Boardpage";
// import InviteMember from "../inviteMember/inviteMember";

// const drawerWidth = 240;

// export default function ResponsiveDrawer({ data }) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState("Inbox");

//   const { id } = useParams();
//   console.log(id);

//   const handleDrawerClose = () => {
//     setMobileOpen(false);
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleItemClick = (text) => {
//     setSelectedItem(text);
//     setMobileOpen(false); // Close drawer when an item is clicked
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         {data.map((text, index) => (
//           <ListItem
//             key={text}
//             button
//             onClick={() => handleItemClick(text)}
//             selected={selectedItem === text}
//           >
//             <ListItemButton>
//               <ListItemIcon>
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   const renderComponent = () => {
//     switch (selectedItem) {
//       case "Projects":
//         return <Home />;
//       case "Dashboard":
//         return <Dashboard />;
//       case "Calender":
//         return <CalendarComp />;
//       case "Collaborators":
//         return <Guest />;
//       case "Board":
//         return <Boardpage />;

//       // case 'Members':
//       //     return <ResponsiveDrawer data={['Collaborators', 'Invite Members']}></ResponsiveDrawer>
//       //   case 'Team Leaders':
//       //     return <Leader/>
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         {/* <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Collaborators
//           </Typography>
//         </Toolbar> */}
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerClose}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         <Toolbar />
//         {renderComponent()}
//       </Box>
//     </Box>
//   );
// }
import React, { useState } from "react";
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
import { useParams } from "react-router-dom";
import Boardpage from "../../pages/Boardpage";
import Backlog from "../Backlog/Backlog";
import Members from "../Members/members";
import BacklogCalender from "../../pages/BacklogCalender";
import InviteMember from "../inviteMember/inviteMember";
import ProjectDashboard from "../Dashboard/project_dashboard";
const drawerWidth = 240;

export default function Project({ data }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Inbox");

  const { id } = useParams();
  console.log(id);

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
      <List>
        {data.map((text, index) => (
          <ListItem
            key={text}
            button
            onClick={() => handleItemClick(text)}
            selected={selectedItem === text}
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderComponent = () => {
    switch (selectedItem) {
      case "Projects":
        return <Home />;
      case "Dashboard":
        return <Dashboard />;
      case "Calender":
        return <CalendarComp />;
      case "Collaborators":
        return <Members id={id} />;
      case "Board":
        return <Boardpage id={id} />;
      case "Backlog":
        return <Backlog />;
      case "BacklogCalender":
        return <BacklogCalender />;
      case "InviteMember":
        return <InviteMember id={id}></InviteMember>;
      // case 'Members':
      //     return <ResponsiveDrawer data={['Collaborators', 'Invite Members']}></ResponsiveDrawer>
      //   case 'Team Leaders':
      //     return <Leader/>
      default:
        return null;
    }
  };

  return (
    // <Box sx={{ display: 'flex'}} style={{ height: "100%"}}>
    /* <CssBaseline />
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        mt: { lg: '100px'},
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: " rgba(0, 0, 0, 0.485)",
        
      }}
    > */
    /* <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Collaborators
      </Typography>
    </Toolbar> */
    /* </AppBar> */

    /* <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        
      >
        {drawer}
      </Drawer>


      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box> */

    /* </Box> */

    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          width: "fit-content",
          height: "100vh",
          backgroundColor: "#253745",
        }}
      >
        {drawer}
      </div>

      <div
        style={{
          height: "90vh",
          width: "100%",
          margin: "2vw",
          overflowY: "auto",
        }}
      >
        {renderComponent()}
      </div>

      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}

      >
        <Toolbar />
        {renderComponent()}
      </Box> */}
    </div>
  );
}
