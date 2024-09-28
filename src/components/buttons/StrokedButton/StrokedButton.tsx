const StrokedButton = ({ title, onClick }) => {
  return (
    <button
      className={
        "border-2 py-2.5 px-4 rounded-2xl border-black hover:scale-95 active:scale-90 transition duration-300"
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default StrokedButton;
