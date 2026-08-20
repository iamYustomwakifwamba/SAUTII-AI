import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from "lucide-react";

function AlertBox({
  type = "info",
  message,
  onClose,
}) {

  if (!message) return null;

  const styles = {
    success: {
      wrapper:
        "bg-emerald-50 border-emerald-200 text-emerald-700",
      icon: <CheckCircle2 size={18} />,
    },

    error: {
      wrapper:
        "bg-red-50 border-red-200 text-red-700",
      icon: <AlertCircle size={18} />,
    },

    info: {
      wrapper:
        "bg-blue-50 border-blue-200 text-blue-700",
      icon: <Info size={18} />,
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div
      className={`
        w-full
        flex
        items-start
        gap-3
        px-4
        py-3
        border
        ${currentStyle.wrapper}
      `}
      role="alert"
    >

      <div className="flex-shrink-0 mt-0.5">
        {currentStyle.icon}
      </div>

      <div className="flex-1 text-sm font-medium leading-5">
        {message}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Close alert"
        >
          <X size={16} />
        </button>
      )}

    </div>
  );
}

export default AlertBox;