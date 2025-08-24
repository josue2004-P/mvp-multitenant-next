type ActionButtonProps = {
  status: "active" | "inactive";
  onClick?: () => void;
};

export  function ActionButton({ status, onClick }: ActionButtonProps) {
  return status === "active" ? (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition"
    >
      Inactivar
    </button>
  ) : (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition"
    >
      Activar
    </button>
  );
}
