// model/Post.js
import { field } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Todo extends Model {
  static table = "todos";

  @field("title") title;

  @field("description") description;
}
