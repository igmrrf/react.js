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
import { AddUser, EditUser } from "../../containers/users";
import useData from "../../hooks/useData";
import {
  clearUserMessage,
  deleteUserStartAsync,
  fetchUsersStartAsync,
} from "./users.redux";

const UserContainer = () => {
  const classes = useContainerStyles();
  const dispatch = useDispatch();
  const [users, count, pageUsers, page, handlePageChange] = useData(
    "users",
    fetchUsersStartAsync,
    clearUserMessage
  );

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Users <strong className={classes.length}> [{users.length}]</strong>
      </Typography>
      <AddUser />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pageUsers.length > 1 ? (
          pageUsers.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  className={classes.delete}
                  onClick={() => dispatch(deleteUserStartAsync(each))}
                />
                <Typography>{each.name}</Typography>
                <Typography> {each.username}</Typography>
                <Typography>{each.email}</Typography>
                <Typography>{each.phone}</Typography>
                <Typography>{each.website}</Typography>
                <Box>
                  <EditUser key={each.id} user={each} />
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

export default UserContainer;
