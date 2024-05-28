import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoLumi from "../../assets/logo.svg";

function ResponsiveAppBar() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#024226", marginBottom: "2rem" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={LogoLumi}
            style={{ padding: "1.2rem 0rem 1.2rem 0rem" }}
          ></img>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
