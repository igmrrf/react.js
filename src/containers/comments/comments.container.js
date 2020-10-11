import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  fetchCommentsStartAsync,
  deleteCommentStartAsync,
  clearCommentMessages,
} from '../../redux/comments-redux/comments.actions';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import TransitionsModal from '../../components/comment-edit-modal.component';
import AddItemModal from '../../components/comment-add-modal.component';
import DeleteForeverRounded from '@material-ui/icons/DeleteForeverRounded';
import SkeletonComponent from '../../components/skeleton.component';
import blue from '@material-ui/core/colors/blue';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  commentImage: {
    height: '20vmin',
    pointerEvents: 'none',
  },
  card: {
    padding: theme.spacing(2),
    position: 'relative',
  },
  delete: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    cursor: 'pointer',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  length: {
    fontSize: '16px',
    color: blue,
  },
  skeleton: {
    padding: 0,
    margin: 0,
  },
}));

const CommentContainer = ({
  fetchCommentsStartAsync,
  deleteCommentStartAsync,
  comments,
  isFetching,
  clearCommentMessages,
  errorMessage,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageComments, setPageComments] = useState([]);
  const classes = useStyles();
  const count = Math.ceil(comments.length / 10);

  useEffect(() => {
    if (comments.length < 1) fetchCommentsStartAsync();
  }, [fetchCommentsStartAsync, comments]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: 'error' });
      clearCommentMessages();
    }
  }, [errorMessage, clearCommentMessages, enqueueSnackbar]);
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
      <Typography variant={'h2'} component={'h1'}>
        Comments
        <strong className={classes.length}> [{comments.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={'center'} alignItems={'center'} spacing={4}>
        {pageComments.length > 1 ? (
          pageComments.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={'primary'}
                  className={classes.delete}
                  onClick={() => deleteCommentStartAsync(each.id)}
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
        color='primary'
        variant='outlined'
        size='small'
      />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCommentsStartAsync: () => dispatch(fetchCommentsStartAsync()),
  deleteCommentStartAsync: (id) => dispatch(deleteCommentStartAsync(id)),
  clearCommentMessages: () => dispatch(clearCommentMessages()),
});

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  isFetching: state.comments.isFetching,
  errorMessage: state.comments.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
