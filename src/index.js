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

// Electron
// const electron = window.require("electron");
// const BrowserWindow = electron.remote.BrowserWindow;

// const loadView = () => {
//   return `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Mohon Tunggu Sebentar</title>
//         <meta charset="UTF-8">
//       </head>
//       <body>
//         <div id="view">Mohon Tunggu Sebentar</div>
//       </body>
//     </html>
//   `;
// };

// var file = "data:text/html;charset=UTF-8," + encodeURIComponent(loadView());

// let win = new BrowserWindow({ width: 500, height: 500, show: true });
// win.loadURL(file).then(() => {
//   // const options = { silent: true };
//   // win.webContents.print(options, () => {
//   //   win.close();
//   // });
// });

const { store, persistor } = configureStore;

const adapter = new LokiJSAdapter({
  dbName: "AppName",
  schema: appSchema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
});

const database = new Database({
  adapter,
  modelClasses: [TodoModel],
  actionsEnabled: true,
});

const todosCollection = database.collections.get("todos");

async function buatData() {
  await database.action(async () => {
    const newTodos = await todosCollection.create((todo) => {
      todo.title = "New post";
      todo.description = "Lorem ipsum...";
    });

    console.log(newTodos);
  });
}

function lihatData() {
  const getTodos = todosCollection.query().fetch();

  getTodos.then((data) => {
    console.log(data);
  });
}

lihatData();
// buatData();

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
