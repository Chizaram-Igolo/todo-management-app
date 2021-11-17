import { createContext, useContext } from "react";

import { items } from "../utils/fake-data";

// The form our data will be in.
let data: object[] = [];

// Create default context data.
const DataContext = createContext(data);

// DataProvider wrapping for the entire app.
export const DataProvider: React.FC = (props): JSX.Element => {
  return (
    <DataContext.Provider value={items}>{props.children}</DataContext.Provider>
  );
};

// useContext wrapping from inheriting child components.
export const useData = () => {
  return useContext(DataContext);
};
