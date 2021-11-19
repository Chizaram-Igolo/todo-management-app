import { ObjectId } from "mongodb";

export type todoItem = {
  _id: ObjectId;
  content: string;
  dueDate: Date;
  status: string;
};
