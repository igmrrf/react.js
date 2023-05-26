import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import {
  Box,
  Container,
  Fab,
  Toolbar,
  Zoom,
  useScrollTrigger,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { PropsWithChildren } from "react";
// import { ErrorBoundary } from "react-error-boundary";
import Boundary, {
  handleStateReset,
  logError,
} from "../components/ErrorBoundary";
import Fallback from "../components/Fallback";
import Navigation from "./components/navbar";

const classes = {
  root: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
};

function ScrollTop(props: PropsWithChildren) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={classes.root}>
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function BackToTop(props: any) {
  return (
    <Boundary
      // fallbackRender={Fallback}
      // FallbackComponent={FallbackComponent}
      onReset={handleStateReset}
      fallback={<Fallback />}
      onError={logError}
    >
      <React.Fragment>
        <Navigation />
        <Toolbar id="back-to-top-anchor" />
        <Container>{props.children}</Container>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    </Boundary>
  );
}
