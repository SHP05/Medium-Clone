import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfileSkeleton = () => {
  return (
    <>
      <div className=" flex flex-wrap gap-4">
        <div className="profileImage">
          <div className="relative w-32 h-32 ml-9 rounded-full dark:bg-gray-600">
            <Skeleton
              circle
              baseColor="#36454F"
              className="rounded h-32 w-32"
            />
          </div>
        </div>
        <div className="profileData mx-4">
          <Skeleton
            width={"200px"}
            className="text-4xl font-semibold my-5 w-96"
            baseColor="#36454F"
          ></Skeleton>
          <Skeleton
            width={"300px"}
            className="text-xl my-5 w-60"
            baseColor="#36454F"
          ></Skeleton>
          {/* <Skeleton className="py-2 px-4 rounded-full w-32" baseColor='#36454F'></Skeleton> */}
        </div>
      </div>
    </>
  );
};

export default UserProfileSkeleton;
