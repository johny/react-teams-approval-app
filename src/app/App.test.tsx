import React from "react";
import { renderWithRedux } from "../test-utils";

import App from "./App";

test("renders app headline", () => {
  const { getByText } = renderWithRedux(<App />);
  const headline = getByText(/Team approvals admin/i);
  expect(headline).toBeInTheDocument();
});
