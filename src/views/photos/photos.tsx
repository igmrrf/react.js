import DeleteForeverRounded from "@mui/icons-material/DeleteForeverRounded";
import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import SkeletonComponent from "../../components/skeleton.component";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import { AddPhoto, EditPhoto } from "../../containers/photos";
import { useAppDispatch } from "../../hooks/redux";
import { Tags } from "../../hooks/types";
import useData from "../../hooks/useData";
import {
  clearPhotoMessage,
  deletePhotoStartAsync,
  fetchPhotosStartAsync,
} from "./photos.redux";

const PhotoContainer = () => {
  const classes = useContainerStyles;
  const dispatch = useAppDispatch();
  const [photos, count, pagePhotos, page, handlePageChange] = useData(
    Tags.photos,
    fetchPhotosStartAsync,
    clearPhotoMessage
  );

  return (
    <Box sx={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Photos <strong style={classes.length}> [{photos.length}]</strong>
      </Typography>
      <AddPhoto />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pagePhotos.length > 1 ? (
          pagePhotos.map((each: any) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper sx={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  sx={classes.delete}
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
        sx={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default PhotoContainer;
