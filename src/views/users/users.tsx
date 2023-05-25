import DeleteForeverRounded from "@mui/icons-material/DeleteForeverRounded";
import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import SkeletonComponent from "../../components/skeleton.component";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import { AddUser, EditUser } from "../../containers/users";
import { Tags } from "../../hooks/types";
import useData from "../../hooks/useData";
import { useAppDispatch } from "../../state/hooks";
import {
  clearUserMessage,
  deleteUserStartAsync,
  fetchUsersStartAsync,
} from "./users.redux";

const UserContainer = () => {
  const classes = useContainerStyles;
  const dispatch = useAppDispatch();
  const [users, count, pageUsers, page, handlePageChange] = useData(
    Tags.users,
    fetchUsersStartAsync,
    clearUserMessage
  );

  return (
    <Box sx={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Users <strong style={classes.length}> [{users.length}]</strong>
      </Typography>
      <AddUser />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pageUsers.length > 1 ? (
          pageUsers.map((each: any) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper sx={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  sx={classes.delete}
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
        sx={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default UserContainer;
