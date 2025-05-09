
import React from "react";
import { Link } from "react-router-dom";

/**
 * Компонент логотипа
 */
const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-2xl font-bold bg-gradient-to-r from-russian-blue to-russian-red bg-clip-text text-transparent">
        ЭМБРОТЕКА
      </span>
    </Link>
  );
};

export default Logo;
