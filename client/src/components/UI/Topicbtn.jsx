const Topicbtn = (Props) => {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          Props.click(Props.category);
        }}
        className="text-gray-300 hover:text-white border border-gray-500 hover:bg-[#191c24] focus:ring-2 focus:outline-none focus:ring-gray-600 focus:bg-gray-900 font-medium rounded-3xl text-sm px-5 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        {Props.name}
      </button>
    </>
  );
};

export default Topicbtn;
