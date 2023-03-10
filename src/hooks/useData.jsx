import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useData = (tag, asyncAction, clearMessage) => {
  const { enqueueSnackbar } = useSnackbar();
  const selectAlbumsData = (state) => state[tag].data;
  const selectAlbumsErrorMessage = (state) => state[tag].errorMessage;
  const selectAlbumsIsFetching = (state) => state[tag].isFetching;

  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageState, setPageState] = useState([]);

  const dispatch = useDispatch();
  const items = useSelector(selectAlbumsData);
  const isFetching = useSelector(selectAlbumsIsFetching);
  const errorMessage = useSelector(selectAlbumsErrorMessage);
  const count = Math.ceil(items.length / 10);

  useEffect(() => {
    if (items.length < 1) dispatch(asyncAction());
  }, [items, dispatch, asyncAction]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      dispatch(clearMessage());
    }
  }, [errorMessage, enqueueSnackbar, dispatch, clearMessage]);

  useEffect(() => {
    setPageState(items.slice(minimum, maximum));
  }, [page, isFetching, minimum, maximum, items]);

  // if (errorMessage === "Network Error") return <Redirect to="/" />;

  return [items, count, pageState, page, handleChange];
};

export default useData;
