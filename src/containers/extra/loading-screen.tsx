import { Box, LinearProgress } from "@mui/material";

const styles = {
  root: {
    alignItems: "center",
    backgroundColor: "rgb(18,29,51)",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxHeight: "100vh",
    justifyContent: "center",
  },
};

const LoadingScreen = () => {
  return (
    <Box sx={styles.root}>
      <Box width={360}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
