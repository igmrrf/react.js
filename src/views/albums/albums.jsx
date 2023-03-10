import Box from "@material-ui/core/Box";
import blue from "@material-ui/core/colors/blue";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AddItemModal from "../../containers/albums/components/add-modal";
import EditModal from "../../containers/albums/components/edit-modal";
import SkeletonComponent from "../../containers/components/skeleton.component";
import useData from "../../hooks/useData";

import {
  deleteAlbumStartAsync,
  fetchAlbumsStartAsync,
  selectAlbumsData,
  selectAlbumsErrorMessage,
  selectAlbumsIsFetching,
} from "./albums.redux";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  AlbumImage: {
    height: "20vmin",
    pointerEvents: "none",
  },
  card: {
    padding: theme.spacing(2),
    position: "relative",
  },
  modalBox: {
    display: "flex",
    justifyContent: "space-between",
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

const Albums = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageAlbums, setPageAlbums] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbumsData);
  const isFetching = useSelector(selectAlbumsIsFetching);
  const errorMessage = useSelector(selectAlbumsErrorMessage);
  const count = Math.ceil(albums.length / 10);
  const data = useData();
  console.log(data);

  useEffect(() => {
    if (albums.length < 1) dispatch(fetchAlbumsStartAsync());
  }, [albums, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, enqueueSnackbar]);

  useEffect(() => {
    setPageAlbums(albums.slice(minimum, maximum));
  }, [page, isFetching, albums, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };
  if (errorMessage === "Network Error") return <Redirect to="/" />;
  else
    return (
      <Box className={classes.root}>
        <Typography variant={"h2"} component={"h1"}>
          Albums <strong className={classes.length}> [{albums.length}]</strong>
          <AddItemModal />
        </Typography>

        <Grid container justify={"center"} alignItems={"center"} spacing={4}>
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

                  <Box className={classes.modalBox}>
                    <EditModal key={each.id} album={each} />
                    <Fab color={"primary"} aria-label={"delete"}>
                      <DeleteForeverRounded
                        onClick={() => dispatch(deleteAlbumStartAsync(each.id))}
                      />
                    </Fab>
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
          onChange={handleChange}
          className={classes.pagination}
          color="primary"
          variant="outlined"
          size="small"
        />
      </Box>
    );
};

export default Albums;
