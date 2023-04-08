import { AppBar, Toolbar, IconButton, Grid, Typography } from "@mui/material";
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import { startLogout } from "../../store/auth/thunks";
import { useDispatch } from "react-redux";
import { openOrCloseDrawer } from "../../store/journal";

export const Navbar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  const onToggleDrawer = () => {
    dispatch(openOrCloseDrawer());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
          onClick={onToggleDrawer}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            {"Nuestro diario<3"}
          </Typography>

          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
