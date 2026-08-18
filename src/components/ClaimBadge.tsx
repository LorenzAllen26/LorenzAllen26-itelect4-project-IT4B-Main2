import type { ClaimStatus } from "../types/index";

interface ClaimBadgeProps {
  status: ClaimStatus | string;
}

export default function ClaimBadge({ status }: ClaimBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "Pending":
      default:
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyles()}`}>
      {status}
    </span>
  );
}