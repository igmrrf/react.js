
import DeleteForeverRounded from "@mui/icons-material/DeleteForeverRounded";
import { useDispatch } from "react-redux";
import SkeletonComponent from "../../components/skeleton.component";
import { AddAlbum, EditAlbum } from "../../containers/albums";
import { useContainerStyles } from "../../containers/extra/styles/Styles";
import useData from "../../hooks/useData";

import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import { Tags } from "../../hooks/types";
import {
  clearAlbumMessage,
  deleteAlbumStartAsync,
  fetchAlbumsStartAsync,
} from "./albums.redux";

const Albums = () => {
  const classes = useContainerStyles;
  const dispatch = useDispatch<any>();

  const [albums, count, pageAlbums, page, handlePageChange] = useData(
    Tags.albums,
    fetchAlbumsStartAsync,
    clearAlbumMessage
  );

  return (
    <Box sx={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Albums <strong style={classes.length}> [{albums.length}]</strong>
        <AddAlbum />
      </Typography>

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {pageAlbums.length > 1 ? (
          pageAlbums.map((each: any) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper sx={classes.card} elevation={10}>
                {each.id}

                <Typography>{each.title}</Typography>
                <Box style={{ height: "200px" }}>
                  <img
                    loading={"eager"}
                    src={`https://picsum.photos/seed/${each.id}/200`}
                    alt={""}
                  />
                </Box>

                <Box sx={classes.edit_Delete}>
                  <EditAlbum key={each.id} album={each} />

                  <DeleteForeverRounded
                    aria-label={"delete"}
                    color={"primary"}
                    sx={classes.delete}
                    onClick={() => dispatch(deleteAlbumStartAsync(each))}
                  />
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

export default Albums;
