import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContainerStyles } from "../../components/styles/Styles";
import AddItemModal from "../../containers/comments/components/add-modal";
import TransitionsModal from "../../containers/comments/components/edit-modal";
import SkeletonComponent from "../../containers/components/skeleton.component";
import {
  deleteCommentStartAsync,
  fetchCommentsStartAsync,
  selectCommentsData,
  selectCommentsErrorMessage,
  selectCommentsIsFetching,
} from "./comments.redux";

const CommentContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageComments, setPageComments] = useState([]);
  const classes = useContainerStyles();
  const dispatch = useDispatch();
  const comments = useSelector(selectCommentsData);
  const isFetching = useSelector(selectCommentsIsFetching);
  const errorMessage = useSelector(selectCommentsErrorMessage);
  const count = Math.ceil(comments.length / 10);

  useEffect(() => {
    if (comments.length < 1) dispatch(fetchCommentsStartAsync());
  }, [comments, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, enqueueSnackbar]);

  useEffect(() => {
    setPageComments(comments.slice(minimum, maximum));
  }, [page, isFetching, comments, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Comments
        <strong className={classes.length}> [{comments.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={"center"} alignItems={"center"} spacing={4}>
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
                  <TransitionsModal key={each.id} comment={each} />
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
