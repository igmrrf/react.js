import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { useDispatch } from "react-redux";
import SkeletonComponent from "../../containers/components/skeleton.component";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import { AddPhoto, EditPhoto } from "../../containers/photos";
import useData from "../../hooks/useData";
import {
  clearPhotoMessage,
  deletePhotoStartAsync,
  fetchPhotosStartAsync,
} from "./photos.redux";

const PhotoContainer = () => {
  const classes = useContainerStyles();
  const dispatch = useDispatch();
  const [photos, count, pagePhotos, page, handlePageChange] = useData(
    "photos",
    fetchPhotosStartAsync,
    clearPhotoMessage
  );

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Photos <strong className={classes.length}> [{photos.length}]</strong>
      </Typography>
      <AddPhoto />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pagePhotos.length > 1 ? (
          pagePhotos.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  className={classes.delete}
                  onClick={() => dispatch(deletePhotoStartAsync(each))}
                />

                <Typography>{each.title}</Typography>
                <Box style={{ height: "200px" }}>
                  <img
                    loading={"eager"}
                    src={each.thumbnailUrl}
                    alt={""}
                    height={"200px"}
                  />
                </Box>

                <Box>
                  <EditPhoto key={each.id} photo={each} />
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

export default PhotoContainer;
