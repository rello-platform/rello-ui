import { useState } from "react";

export function TableDemo() {
  const [sortBy, setSortBy] = useState("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const data = [
    { name: "Sarah Johnson", email: "sarah@example.com", stage: "hot", score: 92 },
    { name: "Mike Chen", email: "mike@example.com", stage: "qualified", score: 78 },
    { name: "Emily Davis", email: "emily@example.com", stage: "engaged", score: 65 },
    { name: "David Wilson", email: "david@example.com", stage: "warming", score: 45 },
    { name: "Lisa Brown", email: "lisa@example.com", stage: "cold", score: 20 },
  ];

  const stageColors: Record<string, { bg: string; text: string }> = {
    hot: { bg: "var(--hot-light)", text: "var(--hot)" },
    qualified: { bg: "var(--qualified-light)", text: "var(--qualified)" },
    engaged: { bg: "var(--engaged-light)", text: "var(--engaged)" },
    warming: { bg: "var(--warming-light)", text: "var(--warming)" },
    cold: { bg: "var(--cold-light)", text: "var(--cold)" },
  };

  const sorted = [...data].sort((a, b) => {
    const val = sortBy === "score" ? a.score - b.score : a.name.localeCompare(b.name);
    return sortDir === "asc" ? val : -val;
  });

  const toggleSort = (col: string) => {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Table — Click headers to sort</span>
      </div>
      <div className="m-4 bg-white rounded-xl border border-[var(--neutral-100)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--neutral-50)] border-b border-[var(--neutral-100)]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider cursor-pointer hover:bg-[var(--neutral-100)] select-none" onClick={() => toggleSort("name")}>
                Name {sortBy === "name" && <span className="text-[var(--brand-primary)]">{sortDir === "asc" ? "↑" : "↓"}</span>}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider">Stage</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider cursor-pointer hover:bg-[var(--neutral-100)] select-none" onClick={() => toggleSort("score")}>
                Score {sortBy === "score" && <span className="text-[var(--brand-primary)]">{sortDir === "asc" ? "↑" : "↓"}</span>}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-100)]">
            {sorted.map((row) => {
              const sc = stageColors[row.stage];
              return (
                <tr key={row.name} className="hover:bg-[var(--neutral-50)] transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-sm text-[var(--foreground)] font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-sm text-[var(--neutral-500)]">{row.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full" style={{ backgroundColor: sc.bg, color: sc.text }}>
                      <span className="size-1.5 rounded-full" style={{ backgroundColor: sc.text }} />
                      {row.stage.charAt(0).toUpperCase() + row.stage.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)] text-right font-stat font-bold">{row.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
