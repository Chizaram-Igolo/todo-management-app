import { createContext, useContext } from "react";
import { todoItem } from "../types/todoItem";

import { items } from "../utils/fake-data";

// The form our data will be in.
let data: todoItem[] = [];

// let value: {
//   items: todoItem[];
//   addItem: Function;
//   updateItem: Function;
//   deleteItem: Function;
// };

// Create default context data.
const DataContext = createContext(data);

// DataProvider wrapping for the entire app.
export const DataProvider: React.FC = (props): JSX.Element => {
  function addItem() {}

  function updateItem() {}

  function deleteItem() {}

  //   value = { items, addItem, updateItem, deleteItem };

  return (
    <DataContext.Provider value={items}>{props.children}</DataContext.Provider>
  );
};

// useContext wrapping from inheriting child components.
export const useData = () => {
  return useContext(DataContext);
};
