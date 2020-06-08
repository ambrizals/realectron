// model/Post.js
import { field, action } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Todo extends Model {
  static table = "todos";

  @field("title") title;

  @field("description") description;

  @action async addTodo(title, description) {
    return this.collections.get("todos").create((todo) => {
      todo.title = title;
      todo.description = description;
    });
  }
}
