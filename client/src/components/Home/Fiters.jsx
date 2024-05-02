import PopularPostCard from "../PopularPostCard";

export default function BioCard() {
  return (
    <>
    <main>
    <h1 className='flex text-gray-200 font-bold justify-center text-2xl mt-12'>Popular Posts</h1>
    <PopularPostCard />
    <PopularPostCard/>
    <PopularPostCard/>
    {/* <div className='justify-center max-[640px]:bg- border w-full p-10 text-center rounded-2xl bg-[#191c24] mt-5'>        
        <h1 className='flex text-gray-200 font-bold justify-center'>Popular Posts</h1>
        <div>

        </div>
        <p className='text-gray-500'>at animi sequi sed, consequuntur assumenda quaerat voluptatum aut autem qui repellendus aspernatur quia molestias ex, corporis est?</p>
    </div> */}
    </main>
    </>
  );
}
