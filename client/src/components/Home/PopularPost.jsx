import PopularPostCard from "./PopularPostCard";

export default function BioCard() {
  return (
    <>
      <main>
        <h1 className="flex text-gray-200 font-bold justify-center text-2xl mt-12">
          Popular Posts
        </h1>
        <PopularPostCard
          img_url={"/stokes.jpg"}
          title={"Stokes news"}
          subTitle={"Market is Bullish"}
        />
        <PopularPostCard
          img_url={"/educations.jpg"}
          title={"Education in india"}
          subTitle={"Changes in education rules"}
        />
        <PopularPostCard
          img_url={"/sports.jpg"}
          title={"Cricket live"}
          subTitle={"IPL is Coming soon in India"}
        />
      </main>
    </>
  );
}
