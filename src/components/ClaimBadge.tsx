// src/components/ClaimBadge.tsx
import type { Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  onStatusChange?: (claimId: number, status: ClaimStatus) => void;
  children?: React.ReactNode;
}

const statusStyles: Record<ClaimStatus, string> = {
  [ClaimStatus.Pending]:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  [ClaimStatus.Approved]:
    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  [ClaimStatus.Rejected]:
    "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
};

const ClaimBadge: React.FC<ClaimBadgeProps> = ({
  claim,
  onStatusChange,
  children,
}) => {
  const currentStatus = claim.status ?? ClaimStatus.Pending;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextStatus = e.target.value as ClaimStatus;
    onStatusChange?.(claim.id, nextStatus);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400 my-1">
        Claim for Item #{claim.itemId}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 my-1">
        Notes: {claim.notes}
      </p>
      <label className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
        Status:
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          className={`rounded-md px-2 py-1 text-sm font-semibold border-0 cursor-pointer ${statusStyles[currentStatus]}`}
        >
          <option value={ClaimStatus.Pending}>Pending</option>
          <option value={ClaimStatus.Approved}>Approved</option>
          <option value={ClaimStatus.Rejected}>Rejected</option>
        </select>
      </label>
      <div className="mt-3 pt-3 border-t border-dashed border-gray-200 dark:border-gray-700 italic text-sm text-gray-500 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
};

export default ClaimBadge;