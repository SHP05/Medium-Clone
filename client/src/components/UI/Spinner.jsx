import HashLoader from "react-spinners/HashLoader";

function Spinner() {
  return (
    <div className="sweet-loading flex justify-center items-center">
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
