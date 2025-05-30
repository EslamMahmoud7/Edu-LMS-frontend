import { Menu } from "lucide-react";

interface LogoButtonProps {
  onClick?: () => void;
  showText?: boolean;
  showIcon?: boolean;
}

export default function LogoButton({
  onClick,
  showText = true,
  showIcon = false,
}: LogoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 focus:outline-none py-4"
      aria-label="Toggle menu"
    >
      {showIcon && <Menu className="h-6 w-6 text-gray-600" />}
      <img
        src="/favicon.ico"
        alt="EduSync Logo"
        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 xl:h-10 xl:w-10"
      />
      {showText && (
        <span className="text-xl font-bold text-gray-800">EduSync</span>
      )}
    </button>
  );
}
