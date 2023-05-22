
import DeleteForeverRounded from "@mui/icons-material/DeleteForeverRounded";
import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import SkeletonComponent from "../../components/skeleton.component";
import { AddComment, EditComment } from "../../containers/comments";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import { Tags } from "../../hooks/types";
import useData from "../../hooks/useData";
import {
  clearCommentMessage,
  deleteCommentStartAsync,
  fetchCommentsStartAsync,
} from "./comments.redux";

const CommentContainer = () => {
  const classes = useContainerStyles;
  const dispatch = useDispatch<any>();
  const [comments, count, pageComments, page, handleChange] = useData(
    Tags.comments,
    fetchCommentsStartAsync,
    clearCommentMessage
  );

  return (
    <Box sx={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Comments
        <strong style={classes.length}> [{comments.length}]</strong>
      </Typography>
      <AddComment />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pageComments.length > 1 ? (
          pageComments.map((each: any) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper sx={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  sx={classes.delete}
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
        sx={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default CommentContainer;
