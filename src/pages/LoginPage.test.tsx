import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import LoginPage from "./LoginPage";

function renderLoginPage() {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LoginPage", () => {
  it("sends nothing to the API while the form is invalid", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderLoginPage();

    // Fill invalid credentials: missing required email extension & short password
    await user.type(screen.getByLabelText("Email"), "invalid-email@gmail.com");
    await user.type(screen.getByLabelText("Password"), "123");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    // Verify validation message is shown
    expect(
      await screen.findByText("Email must be an official @dlsl.edu.ph institutional email.")
    ).toBeInTheDocument();

    // Verify fetch was never triggered
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});