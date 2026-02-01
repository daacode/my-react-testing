import { test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTodos } from "../components/useTodos";

test("can add a todo", () => {
  const { result } = renderHook(() => useTodos());

  act(() => {
    result.current.addTodo("Learn hooks testing");
  });

  expect(result.current.todos).toHaveLength(1);
  expect(result.current.todos[0].text).toBe("Learn hooks testing");
});

test("can toggle a todo", () => {
  const { result } = renderHook(() => useTodos());

  act(() => {
    result.current.addTodo("Write better tests");
  });

  const todoId = result.current.todos[0].id;

  act(() => {
    result.current.toggleTodo(todoId);
  });

  expect(result.current.todos[0].completed).toBe(true);
});

test("can delete a todo", () => {
  const { result } = renderHook(() => useTodos());

  act(() => {
    result.current.addTodo("Remove me");
  });

  const todoId = result.current.todos[0].id;

  act(() => {
    result.current.deleteTodo(todoId);
  });

  expect(result.current.todos).toHaveLength(0);
});
