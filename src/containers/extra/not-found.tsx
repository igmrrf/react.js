import { Box, Button, Grid, Paper, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import notFound from "../../assets/404.svg";

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
  },
};

function NotFound() {
  return (
    <Box sx={styles.root}>
      <Grid item xs={12} md={8} sx={styles.not}>
        <Paper component={"img"} src={notFound} width={"100%"} />
        <Tooltip title={"Can we go Home now? 😖"}>
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

export default NotFound;
