import Box from "@material-ui/core/Box";
import blue from "@material-ui/core/colors/blue";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonComponent from "../../containers/components/skeleton.component";
import AddItemModal from "../../containers/posts/components/add-modal";
import TransitionsModal from "../../containers/posts/components/edit-modal";
import {
  clearPostMessage,
  deletePostStartAsync,
  fetchPostsStartAsync,
  selectPostsData,
  selectPostsErrorMessage,
  selectPostsIsFetching,
} from "./posts.redux";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  postImage: {
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

const PostContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pagePosts, setPagePosts] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsData);
  const isFetching = useSelector(selectPostsIsFetching);
  const errorMessage = useSelector(selectPostsErrorMessage);

  const count = Math.ceil(posts.length / 10);

  useEffect(() => {
    if (posts.length < 1) dispatch(fetchPostsStartAsync());
  }, [dispatch, posts]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      dispatch(clearPostMessage());
    }
  }, [errorMessage, enqueueSnackbar, dispatch]);

  useEffect(() => {
    setPagePosts(posts.slice(minimum, maximum));
  }, [page, isFetching, posts, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Posts <strong className={classes.length}> [{posts.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={"center"} alignItems={"center"} spacing={4}>
        {pagePosts.length > 1 ? (
          pagePosts.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={classes.card} elevation={10}>
                id: {each.id} UserId: {each.userId}
                <DeleteForeverRounded
                  color={"primary"}
                  className={classes.delete}
                  onClick={() => dispatch(deletePostStartAsync(each))}
                />
                <Typography>Title: {each.title}</Typography>
                <Typography>Body: {each.body}</Typography>
                <Box>
                  <TransitionsModal key={each.id} post={each} />
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

export default PostContainer;
