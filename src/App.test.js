import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  window.matchMedia = jest.fn(() => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
  HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
});

test("mobile navigation opens, closes after selection, and supports Escape", () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: "Open navigation" });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(screen.getByRole("link", { name: "Work", exact: true }));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(toggle);
  fireEvent.keyDown(window, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("motion controls stay synchronized and contact uses a real email destination", () => {
  render(<App />);
  const controls = screen.getAllByRole("button", { name: "Pause animations" });
  fireEvent.click(controls[0]);
  expect(
    screen.getAllByRole("button", { name: "Resume animations" }),
  ).toHaveLength(2);
  expect(controls[0]).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(
    screen.getAllByRole("button", { name: "Resume animations" })[1],
  );
  expect(
    screen.getAllByRole("button", { name: "Pause animations" }),
  ).toHaveLength(2);
  expect(
    screen.getByRole("link", { name: "taikiy49@gmail.com" }),
  ).toHaveAttribute("href", "mailto:taikiy49@gmail.com");
});
