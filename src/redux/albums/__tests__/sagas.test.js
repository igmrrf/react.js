import fetchAlbumsStartAsync from "../sagas";
import { call } from "redux-saga/effects";
import axios from "../../../utils/axios";

test("lests see", () => {
  const iterator = fetchAlbumsStartAsync();
  assert.deepEqual(
    iterator.next().value,
    call(axios.get("albums").then((res) => res.data)),
    "fetchAlbumStart should yield an effect to call axios on the link api"
  );
});
