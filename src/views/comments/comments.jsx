import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { useDispatch } from "react-redux";
import { AddComment, EditComment } from "../../containers/comments";
import SkeletonComponent from "../../containers/components/skeleton.component";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import useData from "../../hooks/useData";
import {
  clearCommentMessage,
  deleteCommentStartAsync,
  fetchCommentsStartAsync,
} from "./comments.redux";

const CommentContainer = () => {
  const classes = useContainerStyles();
  const dispatch = useDispatch();
  const [comments, count, pageComments, page, handleChange] = useData(
    "comments",
    fetchCommentsStartAsync,
    clearCommentMessage
  );

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Comments
        <strong className={classes.length}> [{comments.length}]</strong>
      </Typography>
      <AddComment />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pageComments.length > 1 ? (
          pageComments.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  className={classes.delete}
                  onClick={() => dispatch(deleteCommentStartAsync(each))}
                />
                <Typography>
                  {each.name} ({each.email})
                </Typography>
                <Typography>Comment: {each.body}</Typography>
                <Box>
                  <EditComment key={each.id} comment={each} />
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

export default CommentContainer;
