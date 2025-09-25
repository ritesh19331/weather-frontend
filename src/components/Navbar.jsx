import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, MoreVert as MoreIcon } from "@mui/icons-material";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "User Details", path: "/user-details" },
    { label: "Other", path: "/other" },
  ];

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2", zIndex: 1201 }}>
      <Toolbar>
        {/* Optional Logo or menu icon */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Weather App
        </Typography>

        {/* Desktop nav items */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {user
            ? navItems.map(({ label, path }) => (
                <Button
                  key={label}
                  color="inherit"
                  component={Link}
                  to={path}
                  sx={{
                    borderBottom:
                      location.pathname === path
                        ? "3px solid white"
                        : "3px solid transparent",
                    borderRadius: 0,
                    transition: "border-bottom 0.3s",
                  }}
                >
                  {label}
                </Button>
              ))
            : null}

          {user ? (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>

        {/* Mobile menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {user
              ? navItems.map(({ label, path }) => (
                  <MenuItem
                    key={label}
                    component={Link}
                    to={path}
                    onClick={handleMenuClose}
                  >
                    {label}
                  </MenuItem>
                ))
              : null}

            {user ? (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onLogout();
                }}
              >
                Logout
              </MenuItem>
            ) : (
              <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                Login
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
