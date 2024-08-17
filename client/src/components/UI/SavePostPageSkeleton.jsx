import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SavePostSkeleton = () => {
  return (
    <>
      <div className="flex flex-col max-[1000px]:flex-wrap w-full rounded-2xl mt-5 h">
        <div className="mt-5 my-2 bg-[#191c24] rounded-lg border-gray-100 p-5">
          <ul>
            <li className="flex flex-row">
              <Skeleton
                className="mx-1 rounded h-10 w-10"
                baseColor="#36454F"
                count={1}
                style={{width:"40px"}}
                circle
              />
              <Skeleton style={{width:"50%"}} className="mx-2 w-52 h-10" baseColor="#36454F" />
            </li>
            <li>
              <Skeleton style={{width:"50%"}} className="mx-2 h-20 mt-4" baseColor="#36454F" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SavePostSkeleton;
