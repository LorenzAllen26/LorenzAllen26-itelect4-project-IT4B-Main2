// src/components/ClaimBadge.tsx
import type { Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  onStatusChange?: (claimId: number, status: ClaimStatus) => void;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({
  claim,
  onStatusChange,
  children,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextStatus = parseInt(e.target.value, 10) as ClaimStatus;
    onStatusChange?.(claim.id, nextStatus);
  };

  return (
    <div className="claim-badge">
      <p>Claim for Item #{claim.itemId}</p>
      <p>Notes: {claim.notes}</p>
      <label>
        Status:
        {/* Cast the status here to resolve the type mismatch safely */}
        <select 
          value={((claim as unknown as { status?: ClaimStatus }).status ?? ClaimStatus.Pending)} 
          onChange={handleStatusChange}
        >
          <option value={ClaimStatus.Pending}>Pending</option>
          <option value={ClaimStatus.Approved}>Approved</option>
          <option value={ClaimStatus.Rejected}>Rejected</option>
        </select>
      </label>
      {children}
    </div>
  );
};

export default ClaimBadge;
