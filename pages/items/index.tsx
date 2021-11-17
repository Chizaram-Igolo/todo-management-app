import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";

import { items } from "../../utils/fake-data";

const ItemList: NextPage = () => {
  const data: object[] = useData();

  console.log(data);

  const [newItem, setNewItem] = useState("");
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
      <ul>
        {items.map((item, id) => {
          return (
            <li key={item + id.toString()}>
              {item.content} - {item.dueDate} - {item.status}
              <input
                type="checkbox"
                defaultChecked={item.status === "done" ? true : false}
              />
              <input type="date" data-date-inline-picker="true" />
              <Link href={`/items/${id}`}>
                <button type="button">Edit</button>
              </Link>
              <button type="button">Delete</button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={submitNewItem}>
        <input
          type="text"
          placeholder="Enter task"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          aria-describedby="enter-task"
        />

        <button type="submit" disabled={submitting || newItem.length === 0}>
          {submitting ? "Submitting..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default ItemList;
