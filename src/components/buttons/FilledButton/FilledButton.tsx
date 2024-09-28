import React from "react";

interface FilledButtonProps {
  title: string;
  href: string;
  styling: string;
}

const FilledButton: React.FC<FilledButtonProps> = ({
  title,
  href,
  styling,
}) => {
  return (
    <div className={styling}>
      <a href={href}>
        <button
          className={
            "bg-gray-800 text-white py-3 px-5 rounded-2xl font-light hover:bg-gray-900 active:scale-95 transition duration-300"
          }
        >
          {title}
        </button>
      </a>
    </div>
  );
};

export default FilledButton;
