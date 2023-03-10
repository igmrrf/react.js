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
import { AddPost, EditPost } from "../../containers/posts";
import useData from "../../hooks/useData";
import {
  clearPostMessage,
  deletePostStartAsync,
  fetchPostsStartAsync,
} from "./posts.redux";

const PostContainer = () => {
  const classes = useContainerStyles();
  const dispatch = useDispatch();
  const [posts, count, pagePosts, page, handlePageChange] = useData(
    "posts",
    fetchPostsStartAsync,
    clearPostMessage
  );

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Posts <strong className={classes.length}> [{posts.length}]</strong>
      </Typography>
      <AddPost />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
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
                  <EditPost key={each.id} post={each} />
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

export default PostContainer;
