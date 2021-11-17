// Fake data for populating TODO list.

type todoItem = { content: string; dueDate: string; status: string };

export const items: todoItem[] = [
  { content: "Do laundry", dueDate: "17-11-21", status: "done" },
  { content: "Cook dinner", dueDate: "21-11-21", status: "unfinished" },
  { content: "Write book", dueDate: "25-11-21", status: "unfinished" },
];
