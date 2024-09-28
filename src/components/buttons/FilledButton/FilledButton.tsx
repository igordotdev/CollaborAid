const FilledButton = ({ title, onClick }) => {
  return (
    <button
      className={
        "bg-gray-800 text-white py-3 px-5 rounded-2xl font-light hover:bg-gray-900 active:scale-95 transition duration-300"
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default FilledButton;
