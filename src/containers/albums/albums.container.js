import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  fetchAlbumsStartAsync,
  deleteAlbumStartAsync,
  clearAlbumMessages,
} from '../../redux/albums-redux/albums.actions';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import TransitionsModal from '../../components/album-edit-modal.component';
import AddItemModal from '../../components/album-add-modal.component';
import DeleteForeverRounded from '@material-ui/icons/DeleteForeverRounded';
import blue from '@material-ui/core/colors/blue';
import SkeletonComponent from '../../components/skeleton.component';
import { useSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom';
import {
  selectAlbumsFetchStatus,
  selectAlbumsData,
  selectAlbumsErrorMessage,
} from '../../redux/albums-redux/albums.selectors';
import { createStructuredSelector } from 'reselect';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  AlbumImage: {
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
}));

const AlbumContainer = ({
  fetchAlbumsStartAsync,
  deleteAlbumStartAsync,
  albums,
  clearAlbumMessages,
  errorMessage,
  isFetching,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageAlbums, setPageAlbums] = useState([]);
  const classes = useStyles();
  const count = Math.ceil(albums.length / 10);

  useEffect(() => {
    if (albums.length < 1) fetchAlbumsStartAsync();
  }, [fetchAlbumsStartAsync, albums]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: 'error' });
      clearAlbumMessages();
    }
  }, [errorMessage, clearAlbumMessages, enqueueSnackbar]);

  useEffect(() => {
    setPageAlbums(albums.slice(minimum, maximum));
  }, [page, isFetching, albums, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };
  if (errorMessage === 'Network Error') return <Redirect to='/' />;
  else
    return (
      <Box className={classes.root}>
        <Typography variant={'h2'} component={'h1'}>
          Albums <strong className={classes.length}> [{albums.length}]</strong>
        </Typography>
        <AddItemModal />

        <Grid container justify={'center'} alignItems={'center'} spacing={4}>
          {pageAlbums.length > 1 ? (
            pageAlbums.map((each) => (
              <Grid item xs={10} sm={5} md={3} key={each.id}>
                <Paper className={classes.card} elevation={10}>
                  {each.id}
                  <DeleteForeverRounded
                    color={'primary'}
                    className={classes.delete}
                    onClick={() => deleteAlbumStartAsync(each.id)}
                  />

                  <Typography>{each.title}</Typography>
                  <Box style={{ height: '200px' }}>
                    <img
                      loading={'eager'}
                      src={`https://picsum.photos/seed/${each.id}/200`}
                      alt={''}
                    />
                  </Box>

                  <Box>
                    <TransitionsModal key={each.id} album={each} />
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
  fetchAlbumsStartAsync: () => dispatch(fetchAlbumsStartAsync()),
  deleteAlbumStartAsync: (id) => dispatch(deleteAlbumStartAsync(id)),
  clearAlbumMessages: () => dispatch(clearAlbumMessages()),
});

const mapStateToProps = createStructuredSelector({
  albums: selectAlbumsData,
  isFetching: selectAlbumsFetchStatus,
  errorMessage: selectAlbumsErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);
