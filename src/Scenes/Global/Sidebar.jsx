import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import LocalPoliceTwoToneIcon from '@mui/icons-material/LocalPoliceTwoTone';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import user_ic from '../../Components/Assets/person.png'


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        
        
          <Link to={to} />
        
        
      </MenuItem>
    );
  };

  const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >

    <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
            <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >

            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
            </MenuItem>

            {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user_ic}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  A21
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item 
                  title="Gestion des incidents"
                  to="/incidents"
                  icon={<AssuredWorkloadIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  
              />

              <Item 
                  title="Gestion des accès"
                  to="/create_access"
                  icon={<KeyTwoToneIcon />}
                  selected={selected}
                  setSelected={setSelected}
              />

              <Item 
                  title="Gestion des gardiens"
                  to="/create_guardian"
                  icon={<LocalPoliceTwoToneIcon />}
                  selected={selected}
                  setSelected={setSelected}
              />

              <Item 
                  title="Gestion des utilisateurs"
                  to="/list_users"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
              />

              <Item 
                  title="Rapport et statistique"
                  to="/dashboard"
                  icon={<ReceiptTwoToneIcon />}
                  selected={selected}
                  setSelected={setSelected}
              />
          </Box>
        </Menu>
    </ProSidebar>
    </Box>
    );
  };

export default Sidebar;