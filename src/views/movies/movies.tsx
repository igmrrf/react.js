import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { auth, bucket, db } from "../../services/firebase";

interface IMovie {
  id: string;
  title: string;
  releaseYear: number;
  hasAward: boolean;
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Movies() {
  const [moviesList, setMoviesList] = useState<any[]>([]);
  const moviesCollection = collection(db, "movies");
  const [image, setImage] = useState<File | Blob | null>(null);
  const [title, setTitle] = useState("");

  const getMoviesList = useCallback(async () => {
    console.log("Getting Movies");
    const moviesSnapshot = await getDocs(moviesCollection);
    const list = moviesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log({ list });
    // setMoviesList((prevState) => {
    //   return list;
    // });
    setMoviesList(list);
  }, [moviesCollection]);

  const deleteMovie = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMoviesList();
  };

  const updateMovie = async (id: string) => {
    console.log({ title });
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title });
    getMoviesList();
  };

  useEffect(() => {
    getMoviesList();
  }, [getMoviesList]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // TODO upload Movie first
      if (!image) return;
      const imageStoreRef = ref(
        bucket,
        `moves/images/${image.name}-${Date.now()}`
      );
      await uploadBytes(imageStoreRef, image);

      const data = new FormData(event.currentTarget);

      const title = data.get("title");
      const releaseYear = data.get("release-year");
      const hasAward = data.get("has-award");
      console.log({ title, releaseYear, hasAward });
      const doc = await addDoc(moviesCollection, {
        title,
        releaseYear: Number(releaseYear),
        hasAward: hasAward === "true",
        userId: auth?.currentUser?.uid,
      });
      console.log({ doc });
    },
    [moviesCollection]
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <input
              type="file"
              name="image"
              id="image"
              required={true}
              onChange={(event) => {
                if (event.target.files) {
                  setImage(event.target.files[0]);
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Movie Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="release-year"
              label="Release Year"
              type="text"
              id="release-year"
              autoComplete="release-year"
            />
            <FormControlLabel
              control={<Checkbox value={true} color="primary" />}
              label="Received Award"
              id="has-award"
              name="has-award"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Box>
                {moviesList.map((movie: IMovie) => (
                  <div>
                    <h1>Title: {movie.title}</h1>
                    <h2>Release year: {movie.releaseYear}</h2>
                    <h3>Has Award: {movie.hasAward ? "Yes" : "No"}</h3>
                    <button onClick={() => deleteMovie(movie.id)}>
                      Delete
                    </button>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="update-title"
                      label="Update MovieTitle"
                      type="text"
                      id="release-year"
                      autoComplete="release-year"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <button onClick={() => updateMovie(movie.id)}>
                      Update
                    </button>
                  </div>
                ))}
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
