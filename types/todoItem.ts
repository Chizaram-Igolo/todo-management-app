import { ObjectId } from "mongodb";

export type todoItem = {
  _id: ObjectId | null;
  content: string;
  dueDate: Date | null;
  status: string;
};
