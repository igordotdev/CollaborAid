import React from "react";

interface NavButtonProps {
  title: string;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ title, href }) => {
  return (
    <a href={href}>
      <button className="group font-normal transition duration-300 text-m active:scale-95">
        {title}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black rounded-full"></span>
      </button>
    </a>
  );
};

export default NavButton;
