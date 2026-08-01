
import { CircleAlert, CircleCheck } from "lucide-react";

function Alert({ message, type = "error" }) {

  const isSuccess = type === "success";

  return (
    <div
      className={`
        flex items-center gap-3 
        rounded-xl px-4 py-3 
        text-sm font-medium
        ${
          isSuccess
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }
      `}
    >
      {isSuccess ? (
        <CircleCheck size={20} />
      ) : (
        <CircleAlert size={20} />
      )}

      <span>{message}</span>
    </div>
  );
}

export default Alert;