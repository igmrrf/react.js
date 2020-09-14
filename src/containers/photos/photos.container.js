import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  fetchPhotosStartAsync,
  deletePhotoStartAsync,
} from "../../redux/photos-redux/photos.actions";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import TransitionsModal from "../../components/photo-edit-modal.component";
import AddItemModal from "../../components/photo-add-modal.component";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  photoImage: {
    height: "20vmin",
    pointerEvents: "none",
  },
  card: {
    padding: theme.spacing(2),
    position: "relative",
  },
  delete: {
    position: "absolute",
    top: "10px",
    left: "10px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  length: {
    fontSize: "16px",
    color: blue,
  },
}));

const PhotoContainer = ({
  fetchPhotosStartAsync,
  deletePhotoStartAsync,
  photos,
  isFetching,
}) => {
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pagePhotos, setPagePhotos] = useState([]);
  const classes = useStyles();
  const count = Math.ceil(photos.length / 10);

  useEffect(() => {
    fetchPhotosStartAsync();
  }, [fetchPhotosStartAsync]);

  useEffect(() => {
    setPagePhotos(photos.slice(minimum, maximum));
  }, [page, isFetching, photos, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Photos <strong className={classes.length}> [{photos.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={"center"} alignItems={"center"} spacing={4}>
        {pagePhotos.map((each) => (
          <Grid item xs={10} sm={5} md={3} key={each.id}>
            <Paper className={classes.card} elevation={10}>
              {each.id}
              <DeleteForeverRounded
                color={"primary"}
                className={classes.delete}
                onClick={() => deletePhotoStartAsync(each.id)}
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
                <TransitionsModal key={each.id} photo={each} />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        className={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPhotosStartAsync: () => dispatch(fetchPhotosStartAsync()),
  deletePhotoStartAsync: (id) => dispatch(deletePhotoStartAsync(id)),
});

const mapStateToProps = (state) => ({
  photos: state.photos.photos,
  isFetching: state.photos.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoContainer);
