import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "../components/TodoForm";

// UNIT TESTING
test("adds a todo when user submits text", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<TodoForm onAddTodo={onAdd} />);

  await user.type(
    screen.getByPlaceholderText("What needs to be done?"),
    "Write React Article"
  );
  await user.click(screen.getByText("Add"));

  expect(onAdd).toHaveBeenCalledWith("Write React Article");
});
