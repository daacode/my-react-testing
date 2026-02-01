import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import TodoList from "../components/TodoList";

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
});

test("shows loading state while fetching todos", () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(<TodoList />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders todos after fetch completes", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [{ id: 1, text: "Learn async testing" }],
  });

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByText("Learn async testing")).toBeInTheDocument();
  });
});

test("shows error message when fetch fails", async () => {
  fetch.mockResolvedValueOnce({ ok: false });

  render(<TodoList />);

  await waitFor(() => {
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
