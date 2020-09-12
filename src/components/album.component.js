import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ConfirmationNumberOutlined } from "@material-ui/icons";

const AlbumComponent = () => (
  <Grid item xs={5} md={3}>
    <Paper>
      <ConfirmationNumberOutlined />
      <Typography>This is the title</Typography>
    </Paper>
  </Grid>
);

export default AlbumComponent;
