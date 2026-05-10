import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders accessible button text", () => {
    render(<Button>Speichern</Button>);

    expect(screen.getByRole("button", { name: "Speichern" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Speichern</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Speichern" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button while loading", () => {
    render(<Button loading loadingLabel="Speichert" />);

    expect(screen.getByRole("button", { name: "Speichert" })).toBeDisabled();
  });
});
