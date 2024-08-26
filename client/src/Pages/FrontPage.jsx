import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

const FronPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen bg-gradient-to-r from-gray-950 to-gray-700">
        {/* <section> */}
        <h1 className="text-center p-40 font-serif text-7xl text-white">
          Fellow Post
        </h1>
        <div className="flex items-center gap-10 justify-center">
          <Button
            variant="outlined"
            style={{
              padding: "10px 20px",
              fontSize: "20px",
              margin: "0px 20px",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            style={{ padding: "10px 20px", fontSize: "20px" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </div>
        {/* </section> */}
      </div>
    </>
  );
};
export default FronPage;
