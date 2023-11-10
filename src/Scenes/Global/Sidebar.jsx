import React from "react";
import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { db } from "../../firebase_config";
import { collection, getDocs } from "firebase/firestore"; 
import { Link, } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import user_ic from '../../Components/Assets/OIP.jpeg'


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
    const [username, setUsername] = useState([]);

    const getAdmin = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inscriptionAdmin"));
        const adminData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))[0];
        setUsername(adminData.nom);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    useEffect(() => {
      getAdmin();
    }, []);

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
                  {username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            
          <Item 
                  title="Gestion des chauffeurs"
                  to="/register_driver"
                  icon={<DriveEtaIcon />}
                  selected={selected}
                  setSelected={setSelected}
              />

              <Item 
                  title="Tracking vehicule"
                  to="/tracking"
                  icon={<ShowChartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  
              />

              <Item 
                  title="Detail carburant"
                  to="/display_detail_carburant"
                  icon={<LocalGasStationIcon />}
                  selected={selected}
                  setSelected={setSelected}
              />

              <Item 
                  title="Maintenance vehicule"
                  to="/display_detail_maintenance"
                  icon={<BuildIcon />}
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