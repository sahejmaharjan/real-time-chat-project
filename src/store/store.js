import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();
const enhancers = [];
const middlewares = [sagaMiddleware];

function configureStore(initialState = {}) {
  // if (process.env.NODE_ENV === "development") {
  //   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  //   if (typeof devToolsExtension === 'function') {
  //     enhancers.push(devToolsExtension())
  //   }
  // }

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
    // compose(applyMiddleware(...middlewares), ...enhancers)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

const storeObj = configureStore();
export default storeObj;
