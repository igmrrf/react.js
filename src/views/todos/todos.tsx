import {
  CheckCircle,
  CheckCircleOutline,
  DeleteForeverRounded,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import SkeletonComponent from "../../components/skeleton.component";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import { AddTodo, EditTodo } from "../../containers/todos";
import { useAppDispatch } from "../../hooks/redux";
import { Tags } from "../../hooks/types";
import useData from "../../hooks/useData";
import {
  clearTodoMessage,
  deleteTodoStartAsync,
  fetchTodosStartAsync,
} from "./todos.redux";

const TodoContainer = () => {
  const classes = useContainerStyles;
  const dispatch = useAppDispatch();
  const [todos, count, pageTodos, page, handlePageChange] = useData(
    Tags.todos,
    fetchTodosStartAsync,
    clearTodoMessage
  );

  return (
    <Box sx={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Todos <strong style={classes.length}> [{todos.length}]</strong>
      </Typography>
      <AddTodo />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pageTodos.length > 1 ? (
          pageTodos.map((each: any) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper sx={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  sx={classes.delete}
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
        sx={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default TodoContainer;
