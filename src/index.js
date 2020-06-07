// Database Implementation
import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import appSchema from "./models/schema";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./stores";
import { PersistGate } from "redux-persist/integration/react";

// Model Declare
import TodoModel from "./models/Todo";

const { store, persistor } = configureStore;

const adapter = new LokiJSAdapter({
  appSchema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
});

const database = new Database({
  adapter,
  modelClasses: [TodoModel],
  actionsEnabled: true,
});

const Loading = () => {
  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

ReactDOM.render(
  <DatabaseProvider database={database}>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </DatabaseProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
