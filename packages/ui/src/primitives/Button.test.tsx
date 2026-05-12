import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Schreib mir</Button>);
    expect(screen.getByRole("button", { name: "Schreib mir" })).toBeInTheDocument();
  });

  it("sets aria-busy while loading", () => {
    render(<Button loading>Schreib mir</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });
});
