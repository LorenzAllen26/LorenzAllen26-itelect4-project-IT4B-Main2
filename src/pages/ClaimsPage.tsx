import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { ClaimRecord } from "../api/client";
import ClaimBadge from "../components/ClaimBadge";

function ClaimCard({ claim }: { claim: ClaimRecord }) {
  const { data: item, isLoading } = useQuery({
    queryKey: ["item", claim.itemId],
    queryFn: () => api.getItemById(claim.itemId),
  });

  return (
    <div className="border rounded-lg p-5 shadow-sm my-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
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
          <span className="text-gray-600 dark:text-gray-400">Status:</span>
          <ClaimBadge status={claim.status} />
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

  if (isLoading) return <div className="p-6 text-center">Loading claims...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error loading claims.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Claims</h1>
      {claims && claims.length > 0 ? (
        claims.map((claim) => <ClaimCard key={claim.id} claim={claim} />)
      ) : (
        <div className="text-center text-gray-500">No claims found.</div>
      )}
    </div>
  );
}