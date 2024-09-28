const ProfileButton = ({ img, onClick }) => {
  return (
    <button
      className={
        "w-20 h-20 rounded-full hover:shadow-custom transition-shadow duration-300 active:scale-95"
      }
      onClick={onClick}
    >
      <img
        className={"bg-clip-border rounded-full w-20 h-20 object-cover"}
        src={img}
        alt={"Profile"}
      />
    </button>
  );
};

export default ProfileButton;
