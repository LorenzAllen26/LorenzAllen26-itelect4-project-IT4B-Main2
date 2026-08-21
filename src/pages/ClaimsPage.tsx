import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { ClaimRecord } from "../api/client";

function ClaimCard({ claim }: { claim: ClaimRecord }) {
  // Explicitly type useState to match claim.status union type
  const [status, setStatus] = useState<ClaimRecord["status"]>(claim.status);

  const { data: item, isLoading } = useQuery({
    queryKey: ["item", claim.itemId],
    queryFn: () => api.getItemById(claim.itemId),
  });

  return (
    <div className="border rounded-lg p-5 shadow-sm my-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-w-2xl mx-auto transition-colors">
      <div className="text-center font-semibold text-lg text-gray-800 dark:text-gray-100">
        {isLoading ? "Loading item details..." : `Claim for ${item?.name || `Item #${claim.itemId}`}`}
      </div>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-1">
        Claimer ID: <span className="font-medium text-gray-700 dark:text-gray-300">{claim.userId}</span>
      </p>

      <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
        Notes: {claim.notes}
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-gray-200 dark:border-gray-700 mt-4 pt-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400 font-medium">Status:</span>
          
          {/* Cast e.target.value as ClaimRecord["status"] */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ClaimRecord["status"])}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer outline-none transition-colors ${
              status === "Approved"
                ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700"
                : status === "Rejected"
                ? "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700"
                : "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700"
            }`}
          >
            <option value="Pending" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              Pending
            </option>
            <option value="Approved" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              Approved
            </option>
            <option value="Rejected" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              Rejected
            </option>
          </select>
        </div>

        <div className="text-xs text-gray-400 italic">
          Submitted {new Date(claim.submittedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default function ClaimsPage() {
  const { data: claims, isLoading, error } = useQuery<ClaimRecord[]>({
    queryKey: ["claims"],
    queryFn: api.getClaims,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 text-center text-gray-900 dark:text-gray-100">
        Loading claims...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 text-center text-red-500">
        Error loading claims.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        My Claims
      </h1>
      {claims && claims.length > 0 ? (
        claims.map((claim) => <ClaimCard key={claim.id} claim={claim} />)
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">No claims found.</div>
      )}
    </div>
  );
}