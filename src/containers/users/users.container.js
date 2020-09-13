import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  fetchUsersStartAsync,
  deleteUserStartAsync,
} from "../../redux/users-redux/users.actions";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import TransitionsModal from "../../components/user-edit-modal.component";
import AddItemModal from "../../components/user-add-modal.component";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  userImage: {
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

const UserContainer = ({
  fetchUsersStartAsync,
  deleteUserStartAsync,
  users,
  isFetching,
}) => {
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageUsers, setPageUsers] = useState([]);
  const classes = useStyles();
  const count = Math.ceil(users.length / 10);

  useEffect(() => {
    fetchUsersStartAsync();
  }, [fetchUsersStartAsync]);

  useEffect(() => {
    setPageUsers(users.slice(minimum, maximum));
  }, [page, isFetching, users, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Users <strong className={classes.length}> [{users.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={"center"} alignItems={"center"} spacing={4}>
        {pageUsers.map((each) => (
          <Grid item xs={10} sm={5} md={3} key={each.id}>
            <Paper className={classes.card} elevation={10}>
              {each.id}
              <DeleteForeverRounded
                color={"primary"}
                className={classes.delete}
                onClick={() => deleteUserStartAsync(each.id)}
              />

              <Typography>{each.name}</Typography>
              <Typography> {each.username}</Typography>
              <Typography>{each.email}</Typography>
              <Typography variant={"h6"} component={"h6"}>
                Address
              </Typography>
              <Typography>{each.address.street}</Typography>
              <Typography>{each.address.suite}</Typography>
              <Typography>{each.address.city}</Typography>
              <Typography>{each.address.zipcode}</Typography>

              <Box>
                <TransitionsModal key={each.id} user={each} />
              </Box>
            </Paper>
          </Grid>
        ))}
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

const mapDispatchToProps = (dispatch) => ({
  fetchUsersStartAsync: () => dispatch(fetchUsersStartAsync()),
  deleteUserStartAsync: (id) => dispatch(deleteUserStartAsync(id)),
});

const mapStateToProps = (state) => ({
  users: state.users.users,
  isFetching: state.users.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
