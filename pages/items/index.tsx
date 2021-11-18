import type { NextPage } from "next";
import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";

import ItemCard from "../../components/elements/ItemCard";

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
            <ItemCard
              itemContent={item.content}
              itemDueDate={item.dueDate}
              itemStatus={item.status}
              itemNum={id + 1}
            />
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
        <input type="date" data-date-inline-picker="true" />

        <button type="submit" disabled={submitting || newItem.length === 0}>
          {submitting ? "Submitting..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default ItemList;
