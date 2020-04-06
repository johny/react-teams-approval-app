import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";

import rootReducer from "../app/rootReducer";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with

export const renderWithRedux = (ui: any, { initialState = {} } = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};
