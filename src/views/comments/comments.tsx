import DeleteForeverRounded from "@mui/icons-material/DeleteForeverRounded";
import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SkeletonComponent from "../../components/skeleton.component";
import { AddComment, EditComment } from "../../containers/comments";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import { Tags } from "../../hooks/types";
import useData from "../../hooks/useData";
import { useAppDispatch } from "../../state/hooks";
// import { useFetchPriceQuery } from "./comment.api";
import { useEffect } from "react";
import {
  clearCommentMessage,
  deleteCommentStartAsync,
  fetchCommentsStartAsync,
} from "./comments.redux";
import { IComment } from "../../containers/types";
import { useLoginMutation } from "../auth/auth.api";

const CommentContainer = () => {
  const classes = useContainerStyles;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [comments, count, pageComments, page, handleChange, errorMessage] =
    useData(Tags.comments, fetchCommentsStartAsync, clearCommentMessage);
  // const {
  //   data = { time: "", asset_id_base: "", asset_id_quote: "", rate: 0 },
  //   isFetching,
  //   error,
  // } = useFetchPriceQuery();
  const [login, {isLoading}] = useLoginMutation();

  const handleSubmit = async (event)=>{
    event.preventDefault();
    try {
      const result = await login({username: "test", password: "test"}).unwrap();
      dispatch(setComments(result))
      console.log({result});
    } catch (error) {
      if(!error.status){
        return navigate("/login");
      }else if (error.status === 401){
        return navigate("/login");
      }else if (error.status === 400){
        return navigate("/login");
      }

      console.log({error});
    }
  }

  // Find Means to return this
  useEffect(() => {
    if (errorMessage === "Network Error") return navigate("/");
  }, [navigate, errorMessage]);

  return (
    <Box sx={classes.root}>
      {/* <div>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Asset Id</th>
              <th>Asset Quote</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <h1>Loading</h1>
            ) : (
              <tr>
                <td>{data.time}</td>
                <td>{data.asset_id_base}</td> <td>{data.asset_id_quote}</td>
                <td>{data.rate}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
      <Typography variant={"h2"} component={"h1"}>
        Comments
        <strong style={classes.length}> [{comments?.length}]</strong>
      </Typography>
      <AddComment />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pageComments.length >= 1 ? (
          pageComments.map((each: IComment) => (
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
