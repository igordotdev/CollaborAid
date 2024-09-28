import React from "react";

interface StrokedButtonProps {
  title: string;
  href: string;
  styling: string;
}

const StrokedButton: React.FC<StrokedButtonProps> = ({
  title,
  href,
  styling,
}) => {
  return (
    <div className={styling}>
      <a href={href}>
        <button
          className={
            "border-2 py-2.5 px-4 rounded-2xl border-black hover:scale-95 active:scale-90 transition duration-300"
          }
        >
          {title}
        </button>
      </a>
    </div>
  );
};

export default StrokedButton;
