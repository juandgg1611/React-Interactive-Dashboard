import React from "react";

interface TransactionIconsProps {
  type?: "income" | "expense" | "transfer";
  category?: string;
  size?: number;
  className?: string;
}

const TransactionIcons: React.FC<TransactionIconsProps> = ({
  type = "expense",
  category,
  size = 24,
  className = "",
}) => {
  const getIconByType = () => {
    switch (type) {
      case "income":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
          >
            <path
              d="M12 2L12 22"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M7 7L12 2L17 7"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "expense":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
          >
            <path
              d="M12 2L12 22"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M7 17L12 22L17 17"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "transfer":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="#8FBC8F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 14L12 9L7 14"
              stroke="#8FBC8F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getIconByCategory = () => {
    // Puedes expandir esto según las categorías que uses
    switch (category) {
      case "food":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
          >
            <path
              d="M18 8H22V4H18V8Z"
              stroke="#2E8B57"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 8H6V20H2V8Z"
              stroke="#2E8B57"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8H13V14H9V8Z"
              stroke="#2E8B57"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 12H21V20H17V12Z"
              stroke="#2E8B57"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "transport":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
          >
            <circle cx="7" cy="17" r="2" stroke="#61bc84" strokeWidth="2" />
            <circle cx="17" cy="17" r="2" stroke="#61bc84" strokeWidth="2" />
            <path
              d="M5 17H3V13L5 8H15L17 13V17H15"
              stroke="#61bc84"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return getIconByType();
    }
  };

  return category ? getIconByCategory() : getIconByType();
};

export default TransactionIcons;

// Exportar también como objeto para usar en otros lugares
export const TransactionIconMap = {
  income: TransactionIcons,
  expense: TransactionIcons,
  transfer: TransactionIcons,
};
