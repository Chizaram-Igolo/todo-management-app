import type { NextPage } from "next";
import React, { useState } from "react";

import ItemCard from "../../components/elements/ItemCard";
import { todoItem } from "../../types/todoItem";

interface ItemListProps {
  items: todoItem[];
}

const ItemList: NextPage<ItemListProps> = ({ items }) => {
  return (
    <div>
      <ul>
        {items.map((itemData, id) => {
          return (
            <ItemCard
              itemContent={itemData.content}
              itemDueDate={itemData.dueDate}
              itemStatus={itemData.status}
              itemId={itemData._id}
              itemNum={id + 1}
              key={itemData._id.toString()}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
