import { ReactNode } from "react";

const Button: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <button className="bg-primary text-white px-4 py-2 rounded-md">
      {children}
    </button>
  );
};

export default Button;
