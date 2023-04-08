import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { openOrCloseDrawer, setActiveNote } from "../../store/journal";

export const SidebarItem = ({
  title = "",
  body = "",
  date,
  id,
  imageUrls = [],
}) => {
  const dispatch = useDispatch();

  const activateNote = () => {
    dispatch(setActiveNote({ title, body, date, id, imageUrls }));
  };

  const onToggleDrawer = () => {
    dispatch(openOrCloseDrawer());
  };

  const newTitle = useMemo(() => {
    return title.length >= 15 ? title.substring(0, 15) + "..." : title;
  }, [title]);

  const newBody = useMemo(() => {
    return body.length >= 12 ? body.substring(0, 12) + "..." : body;
  }, [body]);
  return (
    <ListItem disablePadding onClick={onToggleDrawer}>
      <ListItemButton onClick={activateNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container sx={{ alignItems: "center" }}>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
