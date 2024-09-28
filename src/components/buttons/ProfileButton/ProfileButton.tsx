import React from "react";

interface ProfileButtonProps {
  img: string;
  href: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ img, href }) => {
  return (
    <a href={href}>
      <button
        className={
          "w-20 h-20 rounded-full hover:shadow-custom transition-shadow duration-300 active:scale-95"
        }
      >
        <img
          className={"bg-clip-border rounded-full w-20 h-20 object-cover"}
          src={img}
          alt={"Profile"}
        />
      </button>
    </a>
  );
};

export default ProfileButton;
