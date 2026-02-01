import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// INTEGRATION TESTING
// :: ADDING A TODO

test("user can add a todo and see it in the list", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(
    screen.getByPlaceholderText("What needs to be done?"),
    "Write React Article"
  );
  await user.click(screen.getByText("Add"));

  expect(screen.getByText("Write React Article")).toBeInTheDocument();
});

// :: COMPLETING AND DELETING TODO
test("user can complete and delete a todo", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(
    screen.getByPlaceholderText("What needs to be done?"),
    "Approve React Articles"
  );
  await user.click(screen.getByText("Add"));

  const checkbox = screen.getByRole("checkbox", {
    name: /Approve React Articles/i,
  });
  await user.click(checkbox);
  expect(checkbox).toBeChecked();

  const todoItem = screen.getByText("Approve React Articles").closest("li");

  const deleteButton = within(todoItem).getByRole("button", {
    name: /delete/i,
  });

  await user.click(deleteButton);
  expect(screen.queryByText("Approve React Articles")).not.toBeInTheDocument();
});
