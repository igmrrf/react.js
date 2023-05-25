import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { Tags } from "./types";

const useData = (tag: Tags, asyncAction: any, clearMessage: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageState, setPageState] = useState([]);

  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state[tag].data);
  const isFetching = useAppSelector(
    (state: RootState) => state[tag].isFetching
  );
  const errorMessage = useAppSelector(
    (state: RootState) => state[tag].errorMessage
  );
  const count = Math.ceil(items.length / 10);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(asyncAction());
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      dispatch(clearMessage());
    }
  }, [errorMessage]);

  const handleChange = (event: any, value: number) => {
    console.log({ event });
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  useEffect(() => {
    setPageState(items.slice(minimum, maximum));
  }, [page, isFetching, minimum, maximum, items]);

  return [items, count, pageState, page, handleChange, errorMessage];
};

export default useData;
