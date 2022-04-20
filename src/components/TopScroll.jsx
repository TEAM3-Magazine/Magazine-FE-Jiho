const TopScroll = () => {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      className="fixed right-4 bottom-20 text-white bg-sky-600 hover:bg-sky-800 duration-300 w-12 h-12 rounded-full font-bold flex justify-center items-center text-xl cursor-pointer"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </svg>
    </div>
  );
};

export default TopScroll;
