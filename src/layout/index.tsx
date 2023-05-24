import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Container,
  Fab,
  Toolbar,
  Zoom,
  useScrollTrigger,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Navigation from "./components/navbar";

const classes = {
  root: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
};

function ScrollTop(props: any) {
  const { children } = props;

  const trigger = useScrollTrigger({
    // target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: any) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

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
  );
}
