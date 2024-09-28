const NavButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group text-black transition duration-300 text-m font-medium active:scale-95"
    >
      {title}
      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black rounded-full"></span>
    </button>
  );
};

export default NavButton;
