import { Box, Button, Grid, Paper, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import serverDown from "../assets/server-down.svg";

const styles = {
  root: {
    maxWidth: "100vw",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  not: {
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
  },
};

function Fallback() {
  return (
    <Box sx={styles.root}>
      <Grid item xs={12} md={8} sx={styles.not}>
        <Tooltip
          arrow
          title={"I'm scared, I want to go home 😖"}
          placement="top"
        >
          <Paper component={"img"} src={serverDown} width={"100%"} />
        </Tooltip>
        <Tooltip title={"Can we go Home now? 😁"}>
          <Button
            variant={"outlined"}
            color={"primary"}
            component={RouterLink}
            to={"/"}
          >
            Go Home
          </Button>
        </Tooltip>
      </Grid>
    </Box>
  );
}

export default Fallback;
