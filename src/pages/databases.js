import React from "react";
import { useDatabase } from "@nozbe/watermelondb/hooks";

const databasePages = () => {
  // const [stateList, setList] = useState();

  const database = useDatabase();
  const todosCollection = database.collections.get("todos");

  async function getTodos() {
    return await todosCollection.query().fetch();
  }

  async function postData() {
    await database.action(async () => {
      const newTodos = await todosCollection.create((todo) => {
        todo.title = "New post";
        todo.description = "Lorem ipsum...";
      });

      console.log(newTodos);
    });
  }

  getTodos().then((data) => {
    data.forEach((item) => {
      console.log(item);
    });
  });

  // postData();

  return <div>Coba</div>;
};

export default databasePages;
