import { all } from "redux-saga/effects";
import allSaga from "./all/saga";

export default function* rootSaga() {
  yield all([allSaga()]);
}
