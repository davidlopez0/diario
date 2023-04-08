import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  IconButton,
} from "@mui/material";

import { MenuOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { openOrCloseDrawer } from "../../store/journal/journalSlice";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  const { displayName } = useSelector((state) => state.auth);
  const { notes, toggleDrawer } = useSelector((state) => state.journal);
  const onToggleDrawer = () => {
    dispatch(openOrCloseDrawer());
  };
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
            <SidebarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
