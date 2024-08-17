import HashLoader from "react-spinners/HashLoader";

function Spinner() {
  return (
    <div className="h-screen sweet-loading flex justify-center align-middle items-center bg-slate-500">
      <HashLoader
        color={`#14322e`}
        loading={true}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
