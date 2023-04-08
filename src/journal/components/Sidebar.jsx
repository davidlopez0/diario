import {
  Box,
  Drawer,
  Grid,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

import { MenuOutlined, TurnedInNot } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  openOrCloseDrawer,
  setActiveNote,
} from "../../store/journal/journalSlice";
import { useState } from "react";

export const Sidebar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const activateNote = (note) => {
    dispatch(setActiveNote(note));
  };
  const onToggleDrawer = () => {
    dispatch(openOrCloseDrawer());
  };
  const { displayName } = useSelector((state) => state.auth);
  const { notes, toggleDrawer } = useSelector((state) => state.journal);
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: toggleDrawer ? "block" : "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          padding: "1",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>

          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={onToggleDrawer}
          >
            <MenuOutlined />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <ListItem key={note.id} disablePadding onClick={onToggleDrawer}>
              <ListItemButton onClick={() => activateNote(note)}>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                  <ListItemText primary={note.title} />
                  <ListItemText secondary={note.body} />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
