interface ToastProps {
  toast: { msg: string; type: "success" | "error" } | null;
}

export default function Toast({ toast }: ToastProps) {
  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.type === "success" ? "✅" : "❌"} {toast.msg}
    </div>
  );
}
