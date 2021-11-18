import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";

import { items } from "../../utils/fake-data";
import { useData } from "../../contexts/DataContext";
import { todoItem } from "../../types/todoItem";

const EditItemPage: NextPage = () => {
  const data: todoItem[] = useData();
  console.log(data);

  const router = useRouter();

  let itemId = router.query.editId;

  const itemContent: string = data[Number(itemId)]["content"];
  const itemDueDate: string = items[Number(itemId)]["dueDate"];

  const [newItem, setNewItem] = useState("itemContent");
  const [submitting, setSubmitting] = useState(false);

  let submitNewItem: (event: React.FormEvent<HTMLFormElement>) => void;

  submitNewItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    items.push({
      content: newItem,
      dueDate: "30-11-21",
      status: "unfinished",
    });

    setNewItem("");
    setSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={submitNewItem}>
        <input
          type="text"
          placeholder="Enter task"
          onChange={(e) => setNewItem(e.target.value)}
          value={itemContent}
          aria-describedby="enter-task"
        />

        <input
          type="date"
          data-date-inline-picker="true"
          onChange={(e) => console.log(e)}
        />

        <button type="submit" disabled={submitting || newItem.length === 0}>
          {submitting ? "Submitting..." : "Add Item"}
        </button>

        <Link href="/">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditItemPage;
