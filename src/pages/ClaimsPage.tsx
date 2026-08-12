// src/pages/ClaimsPage.tsx
import { useState } from "react";
import ClaimBadge from "../components/ClaimBadge";
import { initialClaim } from "../data/mockData";
import type { ClaimStatus } from "../types/index";

function ClaimsPage() {
  const [claim, setClaim] = useState(initialClaim);

  const handleStatusChange = (_claimId: number, status: ClaimStatus): void => {
    setClaim((prev) => ({ ...prev, status }));
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Claims
      </h2>

      <ClaimBadge claim={claim} onStatusChange={handleStatusChange}>
        Awaiting review
      </ClaimBadge>
    </div>
  );
}

export default ClaimsPage;