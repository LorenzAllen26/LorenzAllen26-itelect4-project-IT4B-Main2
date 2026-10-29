import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SubmissionBadge from "./SubmissionBadge";

const gradedSubmission = {
  repoUrl: "https://github.com/LorenzAllen26/itelect4-project",
  score: 95,
};

describe("SubmissionBadge", () => {
  it("shows the repo link and score correctly", () => {
    render(<SubmissionBadge submission={gradedSubmission} />);
    expect(
      screen.getByText("Repo: https://github.com/LorenzAllen26/itelect4-project")
    ).toBeInTheDocument();
    expect(screen.getByText("Score: 95")).toBeInTheDocument();
  });

  it("says 'Not graded yet' when score is missing", () => {
    const ungradedSubmission = {
      repoUrl: "https://github.com/LorenzAllen26/itelect4-project",
      score: null,
    };
    render(<SubmissionBadge submission={ungradedSubmission} />);
    expect(screen.getByText("Score: Not graded yet")).toBeInTheDocument();
  });
});