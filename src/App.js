import logo from "./logo.svg";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useEffect } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";
import store from "./store/store";
import { Provider, useDispatch } from "react-redux";
import { fetchUser } from "./store/all/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());

    return () => {};
  }, []);
  return (
    <div className="App">
      <Sidebar />
      <Chat />
    </div>
  );
}
function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default withAuthenticator(Main, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
  },
});

//GraphQL endpoint: https://am57it2aurg3riw3fandmdvrjq.appsync-api.us-east-1.amazonaws.com/graphql
