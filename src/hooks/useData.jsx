import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useData = (tag, action) => {
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
    if (items.length < 1) dispatch(action());
  }, [items, dispatch, action]);

  useEffect(() => {
    setPageState(items.slice(minimum, maximum));
  }, [page, isFetching, minimum, maximum, items]);

  return [
    items,
    errorMessage,
    count,
    pageState,
    setMaximum,
    setMinimum,
    page,
    setPage,
  ];
};

export default useData;
