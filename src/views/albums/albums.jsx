import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { useDispatch } from "react-redux";
import { AddAlbum, EditAlbum } from "../../containers/albums";
import SkeletonComponent from "../../containers/components/skeleton.component";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import useData from "../../hooks/useData";

import {
  clearAlbumMessage,
  deleteAlbumStartAsync,
  fetchAlbumsStartAsync,
} from "./albums.redux";

const Albums = () => {
  const classes = useContainerStyles();
  const dispatch = useDispatch();

  const [albums, count, pageAlbums, page, handlePageChange] = useData(
    "albums",
    fetchAlbumsStartAsync,
    clearAlbumMessage
  );

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Albums <strong className={classes.length}> [{albums.length}]</strong>
        <AddAlbum />
      </Typography>

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pageAlbums.length > 1 ? (
          pageAlbums.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={classes.card} elevation={10}>
                {each.id}

                <Typography>{each.title}</Typography>
                <Box style={{ height: "200px" }}>
                  <img
                    loading={"eager"}
                    src={`https://picsum.photos/seed/${each.id}/200`}
                    alt={""}
                  />
                </Box>

                <Box className={classes.edit_Delete}>
                  <EditAlbum key={each.id} album={each} />

                  <DeleteForeverRounded
                    aria-label={"delete"}
                    color={"primary"}
                    className={classes.delete}
                    onClick={() => dispatch(deleteAlbumStartAsync(each))}
                  />
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <SkeletonComponent />
        )}
      </Grid>
      <Pagination
        count={count}
        page={page}
        onChange={handlePageChange}
        className={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default Albums;
