import DeleteForeverRounded from "@mui/icons-material/DeleteForeverRounded";

import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import SkeletonComponent from "../../components/skeleton.component";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import { AddPost, EditPost } from "../../containers/posts";
import { useAppDispatch } from "../../hooks/redux";
import { Tags } from "../../hooks/types";
import useData from "../../hooks/useData";
import {
  clearPostMessage,
  deletePostStartAsync,
  fetchPostsStartAsync,
} from "./posts.redux";

const PostContainer = () => {
  const classes = useContainerStyles;
  const dispatch = useAppDispatch();
  const [posts, count, pagePosts, page, handlePageChange] = useData(
    Tags.posts,
    fetchPostsStartAsync,
    clearPostMessage
  );

  return (
    <Box sx={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Posts <strong style={classes.length}> [{posts.length}]</strong>
      </Typography>
      <AddPost />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pagePosts.length > 1 ? (
          pagePosts.map((each: any) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper sx={classes.card} elevation={10}>
                id: {each.id} UserId: {each.userId}
                <DeleteForeverRounded
                  color={"primary"}
                  sx={classes.delete}
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
        sx={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default PostContainer;
