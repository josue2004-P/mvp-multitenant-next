import { StatusBadgeProps } from "@/types/company";

export  function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}
