import React from "react";

interface FilledButtonProps {
  title: string;
  styling: string;
}

export const FilledButton: React.FC<FilledButtonProps> = ({
  title,
  styling,
}) => {
  return (
    <div className={styling}>
      <button
        className={
          "w-full bg-red-700 text-white py-3 px-5 rounded-2xl font-semibold text-lg hover:bg-red-800 active:scale-95 transition duration-300"
        }
      >
        {title}
      </button>
    </div>
  );
};

interface NavButtonProps {
  title: string;
  styling: string;
}

export const NavButton: React.FC<NavButtonProps> = ({ title, styling }) => {
  return (
    <div className={styling}>
      <button className="group font-normal transition duration-300 text-sm active:scale-95">
        {title}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black rounded-full"></span>
      </button>
    </div>
  );
};

interface ProfileButtonProps {
  img: string;
  styling: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  img,
  styling,
}) => {
  return (
    <div className={styling}>
      <button
        className={
          "rounded-full hover:shadow-custom transition-shadow duration-300 active:scale-95"
        }
      >
        <img
          className={"bg-clip-border rounded-full object-cover"}
          src={img}
          alt={"Profile"}
        />
      </button>
    </div>
  );
};

interface StrokedButtonProps {
  title: string;
  styling: string;
}

export const StrokedButton: React.FC<StrokedButtonProps> = ({
  title,
  styling,
}) => {
  return (
    <div className={styling}>
      <button
        className={
          "border-2 py-2.5 px-4 rounded-2xl border-black hover:scale-95 active:scale-90 transition duration-300"
        }
      >
        {title}
      </button>
    </div>
  );
};
