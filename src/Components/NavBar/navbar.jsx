import "../../styles/Navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ChecklistIcon from "@mui/icons-material/Checklist";

import LogoutIcon from "@mui/icons-material/Logout";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";
import {
  handleDisagreeUserInvitations,
  setCurrentUser,
  updateUserProjects,
} from "../../redux/store/slices/currentUserSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ResetUserState } from "../../redux/store/slices/isUserInDBSlice";

const pages = ["Home"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //notifactions
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // const currentUser = useSelector((state) => state.currentUser.currentUser);

  let userId = localStorage.getItem("id");
  const [invitations, setInvitations] = React.useState([]);

  React.useEffect(() => {
    if (userId) {
      axios.get("http://localhost:8000/users/" + userId).then((res) => {
        setInvitations(res.data.invitations);
      });
    }
  }, [userId]);
  console.log(invitations);

  const [counter, setCounter] = React.useState(0);
  // if (currentUser) {
  //   console.log(currentUser);
  //   // setCounter(currentUser.invitations.length);
  // }
  const dispatch = useDispatch();

  const handleClickAccept = ({ projectId, role }) => {
    console.log(projectId);
    console.log(role);
    let obj = {
      userId: userId,
      project: { role: role, projectId: projectId, assignedTasks: [] },
    };
    console.log(obj);
    setInvitations(invitations.filter((i) => i.projectId !== projectId));
    dispatch(updateUserProjects(obj));
  };

  const handleDisAgreeClk = ({ projectId }) => {
    console.log("Disagree");
    console.log(projectId);
    let obj = {
      userId: userId,
      projectId: projectId,
    };

    dispatch(handleDisagreeUserInvitations(obj));

    setInvitations(invitations.filter((i) => i.projectId !== projectId));
  };
  // if (currentUser)
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <AppBar position="static" style={{ backgroundColor: "#0b0c10" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <ChecklistIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                style={{
                  marginLeft: "20px",
                  color: "rgba(255, 99, 132, 1)",
                }}
              />
              {/* <StickyNote2Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TaskTitan
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link href="/home" style={{ textDecoration: "none" }}>
                        <Typography textAlign="center">Home</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TaskTitan
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page) => (
                  <Button>
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                      }}
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                      to={`${page}`}
                    >
                      {page}
                    </Link>
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Badge
                  badgeContent={counter}
                  color="primary"
                  sx={{ marginRight: "1rem" }}
                >
                  <MailIcon color="white" onClick={handleMenu} />
                </Badge>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  PaperProps={{
                    style: {
                      maxHeight: "25vh",
                      width: "40ch",
                    },
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  {invitations.length > 0 ? (
                    invitations.map((invitation) => (
                      <>
                        <MenuItem>
                          {invitation.projectName}
                          <Button
                            onClick={() => {
                              console.log(invitation.role);
                              handleClickAccept({
                                projectId: invitation.projectId,
                                role: invitation.role,
                              });
                            }}
                          >
                            agree
                          </Button>

                          <Button
                            onClick={() => {
                              handleDisAgreeClk({
                                projectId: invitation.projectId,
                              });
                            }}
                          >
                            Disagree
                          </Button>
                        </MenuItem>
                      </>
                    ))
                  ) : (
                    <MenuItem>No Notifacations</MenuItem>
                  )}
                </Menu>

                <LogoutIcon
                  onClick={() => {
                    console.log(localStorage);
                    localStorage.clear();
                    console.log(localStorage);
                    dispatch(ResetUserState())
                    navigate("/");
                  }}
                ></LogoutIcon>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>

      <div style={{ height: "100%" }}>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Navbar;
