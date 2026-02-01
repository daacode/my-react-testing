import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Todo from "../components/Todo";

// UNIT TESTING
test("shows completed todo as checked out", () => {
  const todo = { id: 3, title: "Approve React Article", done: true };

  render(<Todo todo={todo} onChangeTodo={vi.fn()} onDeleteTodo={vi.fn()} />);

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).toBeChecked();
});
