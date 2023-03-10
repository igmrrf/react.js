import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { CheckCircle, CheckCircleOutline } from "@material-ui/icons";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { useDispatch } from "react-redux";
import SkeletonComponent from "../../containers/components/skeleton.component";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import { AddTodo, EditTodo } from "../../containers/todos";
import useData from "../../hooks/useData";
import {
  clearTodoMessage,
  deleteTodoStartAsync,
  fetchTodosStartAsync,
} from "./todos.redux";

const TodoContainer = () => {
  const classes = useContainerStyles();
  const dispatch = useDispatch();
  const [todos, count, pageTodos, page, handlePageChange] = useData(
    "todos",
    fetchTodosStartAsync,
    clearTodoMessage
  );

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Todos <strong className={classes.length}> [{todos.length}]</strong>
      </Typography>
      <AddTodo />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
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
                  <EditTodo key={each.id} todo={each} />
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

export default TodoContainer;
