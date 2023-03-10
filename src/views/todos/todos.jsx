import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { CheckCircle, CheckCircleOutline } from "@material-ui/icons";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContainerStyles } from "../../components/styles/Styles";
import SkeletonComponent from "../../containers/components/skeleton.component";
import AddItemModal from "../../containers/todos/components/add-modal";
import TransitionsModal from "../../containers/todos/components/edit-modal";
import {
  deleteTodoStartAsync,
  fetchTodosStartAsync,
  selectTodosData,
  selectTodosErrorMessage,
  selectTodosIsFetching,
} from "./todos.redux";

const TodoContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageTodos, setPageTodos] = useState([]);
  const classes = useContainerStyles();
  const dispatch = useDispatch();
  const todos = useSelector(selectTodosData);
  const isFetching = useSelector(selectTodosIsFetching);
  const errorMessage = useSelector(selectTodosErrorMessage);
  const count = Math.ceil(todos.length / 10);

  useEffect(() => {
    if (todos.length < 1) dispatch(fetchTodosStartAsync());
  }, [dispatch, todos]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, enqueueSnackbar]);

  useEffect(() => {
    setPageTodos(todos.slice(minimum, maximum));
  }, [page, isFetching, todos, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Todos <strong className={classes.length}> [{todos.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={"center"} alignItems={"center"} spacing={4}>
        {pageTodos.length > 1 ? (
          pageTodos.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  className={classes.delete}
                  onClick={() => dispatch(deleteTodoStartAsync(each))}
                />

                <Typography>{each.title}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle />}
                      name="checkedH"
                      checked={each.completed}
                    />
                  }
                  label={each.completed ? "Completed" : "Uncompleted"}
                />

                <Box>
                  <TransitionsModal key={each.id} todo={each} />
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

export default TodoContainer;
