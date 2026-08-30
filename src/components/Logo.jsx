import React from "react";
import logoImg from "../assets/images/logo.jpg";

export default function Logo({ variant = "full", className = "", size = "auto" }) {
  const isIcon = variant === "icon";
  
  // Custom sizing based on variant
  const dims = isIcon 
    ? "h-11 w-11 object-cover rounded-xl border border-brand-sage/25 shadow-sm" 
    : "w-full max-w-[280px] h-auto rounded-3xl border-2 border-brand-sage/35 shadow-xl";
    
  const combinedClassName = `${dims} ${className}`;
  const widthHeight = size !== "auto" ? { width: size, height: size } : {};

  return (
    <img
      src={logoImg}
      alt="Gyan Mandir"
      className={combinedClassName}
      style={widthHeight}
    />
  );
}
